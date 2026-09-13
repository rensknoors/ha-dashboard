import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

import { TodoItem } from '../types';
import { TodoAddBar } from './TodoAddBar';
import { TodoItemRow } from './TodoItemRow';

interface TodoListCardProps {
  title: string;
  subtitle: string;
  emptyLabel: string;
  Icon: React.ComponentType<{ size?: number }>;
  open: TodoItem[];
  completed: TodoItem[];
  isPending: boolean;
  isMutating: boolean;
  showDetails?: boolean;
  onAdd: (summary: string) => void;
  onToggle: (item: TodoItem) => void;
  onRemove: (item: TodoItem) => void;
}

export const TodoListCard = ({
  title,
  subtitle,
  emptyLabel,
  Icon,
  open,
  completed,
  isPending,
  isMutating,
  showDetails = false,
  onAdd,
  onToggle,
  onRemove,
}: TodoListCardProps) => {
  const isEmpty = !isPending && open.length === 0 && completed.length === 0;

  return (
    <Card className="flex min-h-0 flex-1 flex-col px-5 py-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-mist-muted text-xs">{subtitle}</div>
        </div>
      </div>

      <TodoAddBar isPending={isMutating} onAdd={onAdd} />

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
        {isPending ? (
          <div className="text-mist-muted py-8 text-center text-sm">
            Laden...
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <IconBadge size={48}>
              <Icon size={22} />
            </IconBadge>
            <div className="text-mist-muted text-sm">{emptyLabel}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {open.length > 0 ? (
              <div className="flex flex-col">
                {open.map((item) => (
                  <TodoItemRow
                    key={item.uid}
                    item={item}
                    showDetails={showDetails}
                    isPending={isMutating}
                    onToggle={onToggle}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            ) : null}

            {completed.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-mist-muted mb-1 text-xs font-semibold tracking-[0.12em] uppercase">
                  Voltooid
                </div>
                {completed.map((item) => (
                  <TodoItemRow
                    key={item.uid}
                    item={item}
                    showDetails={showDetails}
                    isCompleted
                    isPending={isMutating}
                    onToggle={onToggle}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Card>
  );
};
