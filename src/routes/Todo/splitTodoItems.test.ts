import { describe, expect, it } from 'vitest';

import { splitTodoItems } from './splitTodoItems';
import { TodoItem } from './types';

const items: TodoItem[] = [
  { uid: '1', summary: 'Melk', status: 'needs_action' },
  { uid: '2', summary: 'Brood', status: 'needs_action' },
  { uid: '3', summary: 'Kaas', status: 'completed' },
];

describe('splitTodoItems', () => {
  it('splits open and completed items', () => {
    const result = splitTodoItems(items);

    expect(result.open).toHaveLength(2);
    expect(result.completed).toHaveLength(1);
    expect(result.open.map((item) => item.summary)).toEqual(['Melk', 'Brood']);
    expect(result.completed[0]?.summary).toBe('Kaas');
  });

  it('returns empty arrays when there are no items', () => {
    const result = splitTodoItems([]);

    expect(result.open).toEqual([]);
    expect(result.completed).toEqual([]);
  });
});
