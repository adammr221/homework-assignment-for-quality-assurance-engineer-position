export interface TaskSchema {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  labels: string[];
  checklistItems: ChecklistItem[];
}
export interface TaskResponse extends TaskSchema {
  id: number;
}

export interface ChecklistItem {
  text: string;
  done: boolean;
}
