import { BiBell } from 'react-icons/bi';

import { TodoListCard } from './components/TodoListCard';
import { useTodoItems } from './useTodoItems';

const REMINDERS_ENTITY = 'todo.reminders' as const;

export const TodoListPage = () => {
  const {
    open,
    completed,
    isPending,
    isError,
    error,
    addItem,
    toggleItem,
    removeItem,
  } = useTodoItems(REMINDERS_ENTITY);

  const isMutating =
    addItem.isPending || toggleItem.isPending || removeItem.isPending;

  if (isError && error) {
    console.error(error);
    return (
      <div className="text-mist flex h-full w-full items-center justify-center">
        <span>
          {error.name}: {error.message}
        </span>
      </div>
    );
  }

  return (
    <div className="text-mist flex h-full w-full">
      <TodoListCard
        title="Herinneringen"
        subtitle="Taken en afspraken om niet te vergeten"
        emptyLabel="Geen herinneringen"
        Icon={BiBell}
        open={open}
        completed={completed}
        isPending={isPending}
        isMutating={isMutating}
        showDetails
        onAdd={(summary) => addItem.mutate(summary)}
        onToggle={(item) => toggleItem.mutate(item)}
        onRemove={(item) => removeItem.mutate(item)}
      />
    </div>
  );
};
