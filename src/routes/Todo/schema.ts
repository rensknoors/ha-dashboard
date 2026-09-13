import { EntityName } from '@hakit/core';
import { z } from 'zod';

import { TodoItem } from './types';

const todoItemSchema = z.object({
  uid: z.string(),
  summary: z.string(),
  status: z.enum(['needs_action', 'completed']),
  description: z.string().optional(),
  due: z.string().optional(),
});

const todoGetItemsResponseSchema = z.record(
  z.string(),
  z.object({
    items: z.array(todoItemSchema),
  })
);

export const parseTodoGetItemsResponse = (
  serviceResponse: { response: unknown },
  entityId: EntityName
): TodoItem[] => {
  const parsed = todoGetItemsResponseSchema.safeParse(serviceResponse.response);

  if (!parsed.success) {
    return [];
  }

  return parsed.data[entityId]?.items ?? [];
};
