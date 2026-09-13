import clsx from 'clsx';
import { BiCheck, BiTrash } from 'react-icons/bi';

import { TODO_COPY } from '../copy.nl';
import { formatTodoDue } from '../formatTodoDue';
import { TodoItem } from '../types';

interface TodoItemRowProps {
  item: TodoItem;
  isCompleted?: boolean;
  isPending?: boolean;
  showDetails?: boolean;
  onToggle: (item: TodoItem) => void;
  onRemove: (item: TodoItem) => void;
}

export const TodoItemRow = ({
  item,
  isCompleted = false,
  isPending = false,
  showDetails = false,
  onToggle,
  onRemove,
}: TodoItemRowProps) => {
  const dueLabel = item.due ? formatTodoDue(item.due) : undefined;
  const hasDetails =
    showDetails && Boolean(item.description?.trim() || dueLabel);

  return (
    <div
      className={clsx(
        'flex items-start justify-between gap-3 border-t border-white/8 py-2 first:border-t-0 first:pt-0',
        isCompleted && 'opacity-60'
      )}
    >
      <button
        type="button"
        disabled={isPending}
        onClick={() => onToggle(item)}
        className={clsx(
          'flex min-w-0 flex-1 items-start gap-3 text-left',
          'focus-visible:ring-nav-active/40 rounded-lg focus-visible:ring-2 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        <span
          className={clsx(
            'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border',
            isCompleted
              ? 'border-chip-green-fg bg-chip-green text-chip-green-fg'
              : 'border-white/20 bg-transparent'
          )}
        >
          {isCompleted ? <BiCheck size={16} /> : null}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={clsx(
              'block text-sm font-medium',
              isCompleted && 'text-mist-muted line-through'
            )}
          >
            {item.summary}
          </span>
          {hasDetails ? (
            <span className="mt-0.5 flex flex-col gap-0.5">
              {item.description?.trim() ? (
                <span className="text-mist-muted line-clamp-2 text-xs">
                  {item.description.trim()}
                </span>
              ) : null}
              {dueLabel ? (
                <span className="text-mist-muted text-xs tabular-nums">
                  {dueLabel}
                </span>
              ) : null}
            </span>
          ) : null}
        </span>
      </button>

      <button
        type="button"
        disabled={isPending}
        aria-label={TODO_COPY.removeItem(item.summary)}
        onClick={() => onRemove(item)}
        className={clsx(
          'text-mist-muted hover:text-mist mt-0.5 shrink-0 p-1 transition-colors',
          'focus-visible:ring-nav-active/40 rounded-md focus-visible:ring-2 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        <BiTrash size={16} />
      </button>
    </div>
  );
};
