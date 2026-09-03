import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { TaskSchema } from "../types/task";

export class TaskAPI {
  readonly request: APIRequestContext;

  private readonly endpoints = {
    createTask: "/api/v1/tasks",
    getTaskByID: (id: number) => `/api/v1/tasks/${id}`,
    updateTask: (id: number) => `/api/v1/tasks/${id}`,
    deleteTask: (id: number) => `/api/v1/tasks/${id}`,
  };

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createTask(task: TaskSchema): Promise<APIResponse> {
    const response = await this.request.post(this.endpoints.createTask, {
      data: task,
    });
    return response;
  }

  async getTaskByID(id: number): Promise<APIResponse> {
    const response = await this.request.get(this.endpoints.getTaskByID(id));
    return response;
  }

  async updateTask(id: number, task: TaskSchema): Promise<APIResponse> {
    const response = await this.request.put(this.endpoints.updateTask(id), {
      data: task,
    });
    return response;
  }

  async deleteTask(id: number): Promise<APIResponse> {
    const response = this.request.delete(this.endpoints.deleteTask(id));
    return response;
  }
}
