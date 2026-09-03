import { expect, test } from "../../src/fixtures/apiTestFixture";
import { createTask } from "../../src/test-data/createTask";
import { TaskSchema } from "../../src/types/task";

test.describe("Task lifecycle", () => {
  test("Should create, retrieve, update and delete a task", async ({
    taskApi,
    createTaskObject,
  }) => {
    //Create
    const task = createTaskObject;
    const createResponse = await taskApi.createTask(task);
    expect(createResponse.status()).toBe(201);
    const createdTask = await createResponse.json();
    const taskId = createdTask.id;
    expect(taskId).toBeDefined();

    // Retrieve
    const getResponse = await taskApi.getTaskByID(taskId);
    expect(getResponse.status()).toBe(200);
    const retrievedTask = await getResponse.json();
    expect(retrievedTask).toMatchObject({ ...task });
    expect(retrievedTask.id).toBe(taskId);
    expect(retrievedTask.checklistItems[0]).toMatchObject({
      text: task.checklistItems[0].text,
      done: task.checklistItems[0].done,
    });
    expect(retrievedTask.checklistItems[0].id).toBeDefined();

    // Update
    const updatedTask: TaskSchema = {
      ...task,
      title: `Updated task ${Date.now()}`,
      description: "Updated task description",
      status: "IN_PROGRESS",
      priority: "HIGH",
    };
    const updateResponse = await taskApi.updateTask(taskId, updatedTask);
    expect(updateResponse.status()).toBe(200);

    // Retrieve updated task
    const getUpdatedResponse = await taskApi.getTaskByID(taskId);
    expect(getUpdatedResponse.status()).toBe(200);
    const retrievedUpdatedTask = await getUpdatedResponse.json();
    expect(retrievedUpdatedTask.id).toBe(taskId);
    expect(retrievedUpdatedTask.title).toBe(updatedTask.title);
    expect(retrievedUpdatedTask.description).toBe(updatedTask.description);
    expect(retrievedUpdatedTask.status).toBe(updatedTask.status);
    expect(retrievedUpdatedTask.priority).toBe(updatedTask.priority);

    // Delete
    const deleteResponse = await taskApi.deleteTask(taskId);
    expect(deleteResponse.status()).toBe(204);

    // Verify deletion
    const getDeletedResponse = await taskApi.getTaskByID(taskId);
    expect(getDeletedResponse.status()).toBe(404);
  });
});

test.describe("Create Task", () => {
  test("Should create a task with valid data", async ({
    taskApi,
    createTaskObject,
    deleteTask,
  }) => {
    const task = createTaskObject;
    const createResponse = await taskApi.createTask(task);
    expect(createResponse.status()).toBe(201);
    const createdTask = await createResponse.json();
    const taskId = createdTask.id;
    expect(taskId).toBeDefined();
    expect(createdTask.title).toBe(task.title);
    expect(createdTask.description).toBe(task.description);
    expect(createdTask.status).toBe(task.status);
    expect(createdTask.priority).toBe(task.priority);
    expect(createdTask.dueDate).toBe(task.dueDate);
    expect(createdTask.labels).toEqual(task.labels);
    expect(createdTask.checklistItems[0]).toMatchObject({
      text: task.checklistItems[0].text,
      done: task.checklistItems[0].done,
    });
    expect(createdTask.checklistItems[0].id).toEqual(expect.any(Number));
    deleteTask(taskId);
  });

  test("Should not create a task with invalid data", async ({ taskApi }) => {
    const task = createTask();
    const invalidTask = {
      ...task,
      title: "",
    };
    const response = await taskApi.createTask(invalidTask);
    expect(response.status()).toBe(400);
  });
});

test.describe("Get Task", () => {
  test("Should retrieve an existing task", async ({
    taskApi,
    createTask,
    deleteTask,
  }) => {
    const response = await taskApi.getTaskByID(createTask.id);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      id: createTask.id,
      title: createTask.title,
      description: createTask.description,
      status: createTask.status,
      priority: createTask.priority,
      dueDate: createTask.dueDate,
      labels: createTask.labels,
      checklistItems: [
        {
          text: createTask.checklistItems[0].text,
          done: createTask.checklistItems[0].done,
          id: expect.any(Number),
        },
      ],
    });
    expect(body.id).toBe(createTask.id);
    expect(body.checklistItems[0].id).toEqual(expect.any(Number));
    deleteTask(createTask.id);
  });

  test("Should return 404 when retrieving a non-existing task", async ({
    taskApi,
  }) => {
    const response = await taskApi.getTaskByID(10000000);
    expect(response.status()).toBe(404);
  });
});

test.describe("Update Task", () => {
  test("Should return 404 when updating a non-existing task", async ({
    taskApi,
  }) => {
    const task = createTask();
    const response = await taskApi.updateTask(10000000, task);
    expect(response.status()).toBe(404);
  });

  test("Should update an existing task", async ({
    taskApi,
    createTask,
    deleteTask,
  }) => {
    const updatedTask: TaskSchema = {
      ...createTask,
      title: `Updated task ${Date.now()}`,
      description: "Updated task description",
      status: "IN_PROGRESS",
      priority: "HIGH",
    };
    const response = await taskApi.updateTask(createTask.id, updatedTask);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(createTask.id);
    expect(body.title).toBe(updatedTask.title);
    expect(body.description).toBe(updatedTask.description);
    expect(body.status).toBe(updatedTask.status);
    expect(body.priority).toBe(updatedTask.priority);
    expect(body.dueDate).toBe(updatedTask.dueDate);
    expect(body.labels).toEqual(updatedTask.labels);
    deleteTask(createTask.id);
  });
});

test.describe("Delete Task", () => {
  test("Should delete an existing task", async ({ taskApi, createTask }) => {
    const deleteResponse = await taskApi.deleteTask(createTask.id);
    expect(deleteResponse.status()).toBe(204);
    const getResponse = await taskApi.getTaskByID(createTask.id);
    expect(getResponse.status()).toBe(404);
  });

  test("Should return 404 when deleting a non-existing task", async ({
    taskApi,
  }) => {
    const response = await taskApi.deleteTask(10000000);
    expect(response.status()).toBe(404);
  });
});
