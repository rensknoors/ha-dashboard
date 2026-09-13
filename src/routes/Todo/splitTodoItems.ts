import { TodoItem } from './types';

export const splitTodoItems = (items: TodoItem[]) => {
  const open = items.filter((item) => item.status === 'needs_action');
  const completed = items.filter((item) => item.status === 'completed');

  return { open, completed };
};
