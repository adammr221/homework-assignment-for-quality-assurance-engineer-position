import { test as baseTest } from "@playwright/test";
import { TaskAPI } from "../api/task.api";
import { TaskSchema, TaskResponse } from "../types/task";
import { createTask } from "../../src/test-data/createTask";

interface ApiFixtures {
  taskApi: TaskAPI;
  createTaskObject: TaskSchema;
  createTask: TaskResponse;
  deleteTask: (taskId: number) => void;
}

export const test = baseTest.extend<ApiFixtures>({
  taskApi: async ({ request }, use) => {
    const taskApi = new TaskAPI(request);
    await use(taskApi);
  },
  createTaskObject: async ({}, use) => {
    const task = createTask();
    await use(task);
  },
  createTask: async ({ taskApi, createTaskObject }, use) => {
    const response = await taskApi.createTask(createTaskObject);
    const createdTask = await response.json();
    await use(createdTask);
  },
  deleteTask: async ({ taskApi }, use) => {
    let taskId: number | undefined;
    await use((id: number) => {
      taskId = id;
    });
    if (taskId !== undefined) {
      await taskApi.deleteTask(taskId);
    }
  },
});

export { expect } from "@playwright/test";
