import { EntityName, useEntity, useHass } from '@hakit/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { parseTodoGetItemsResponse } from './schema';
import { splitTodoItems } from './splitTodoItems';
import { TodoItem } from './types';

type TodoGetItemsResponse = Record<
  string,
  {
    items: TodoItem[];
  }
>;

export const useTodoItems = (entityId: EntityName) => {
  const callService = useHass((state) => state.helpers.callService);
  const queryClient = useQueryClient();
  const entity = useEntity(entityId);

  const parsedCount = parseInt(entity.state, 10);
  const count = Number.isNaN(parsedCount) ? 0 : parsedCount;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['todo-items', entityId, entity.state],
    queryFn: async () => {
      const target = { entity_id: entityId };

      const [openResponse, completedResponse] = await Promise.all([
        callService({
          domain: 'todo',
          service: 'get_items',
          target,
          serviceData: { status: 'needs_action' },
          returnResponse: true,
        }),
        callService({
          domain: 'todo',
          service: 'get_items',
          target,
          serviceData: { status: 'completed' },
          returnResponse: true,
        }),
      ]);

      return [
        ...parseTodoGetItemsResponse(
          openResponse as { response: TodoGetItemsResponse },
          entityId
        ),
        ...parseTodoGetItemsResponse(
          completedResponse as { response: TodoGetItemsResponse },
          entityId
        ),
      ];
    },
  });

  const { open, completed } = splitTodoItems(data ?? []);

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['todo-items', entityId] });
  }, [queryClient, entityId]);

  const addItem = useMutation({
    mutationFn: async (summary: string) => {
      const trimmed = summary.trim();
      if (!trimmed) {
        return;
      }

      await callService({
        domain: 'todo',
        service: 'add_item',
        target: { entity_id: entityId },
        serviceData: { item: trimmed },
      });
    },
    onSuccess: invalidate,
  });

  const toggleItem = useMutation({
    mutationFn: async (item: TodoItem) => {
      await callService({
        domain: 'todo',
        service: 'update_item',
        target: { entity_id: entityId },
        serviceData: {
          item: item.uid,
          status: item.status === 'completed' ? 'needs_action' : 'completed',
        },
      });
    },
    onSuccess: invalidate,
  });

  const removeItem = useMutation({
    mutationFn: async (item: TodoItem) => {
      await callService({
        domain: 'todo',
        service: 'remove_item',
        target: { entity_id: entityId },
        serviceData: { item: item.uid },
      });
    },
    onSuccess: invalidate,
  });

  return {
    count,
    open,
    completed,
    isPending,
    isError,
    error,
    addItem,
    toggleItem,
    removeItem,
  };
};
