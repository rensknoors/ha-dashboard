export type TodoItemStatus = 'needs_action' | 'completed';

export type TodoItem = {
  uid: string;
  summary: string;
  status: TodoItemStatus;
  description?: string;
  due?: string;
};
