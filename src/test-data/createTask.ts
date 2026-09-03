import type { TaskSchema } from "../types/task";

export const createTask = (): TaskSchema => {
  const dueDate = new Date();
  dueDate.setMonth(dueDate.getMonth() + 6);
  return {
    title: `Test task ${Date.now()}`,
    description: "Test task description",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: dueDate.toISOString().split("T")[0], //2026-09-02T19:10:00.000Z
    labels: ["api"],
    checklistItems: [
      {
        text: "Create Playwright smoke test",
        done: false,
      },
    ],
  };
};
