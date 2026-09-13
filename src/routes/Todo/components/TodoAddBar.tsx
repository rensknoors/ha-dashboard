import clsx from 'clsx';
import { FormEvent, useState } from 'react';
import { BiPlus } from 'react-icons/bi';

import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

import { TODO_COPY } from '../copy.nl';

interface TodoAddBarProps {
  isPending: boolean;
  onAdd: (summary: string) => void;
}

export const TodoAddBar = ({ isPending, onAdd }: TodoAddBarProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isPending) {
      return;
    }

    onAdd(trimmed);
    setValue('');
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={TODO_COPY.addPlaceholder}
        disabled={isPending}
        className={clsx(
          'bg-surface-elevated text-mist placeholder:text-mist-muted',
          'rounded-tile min-w-0 flex-1 border-0 px-4 py-3 text-sm outline-none',
          'focus-visible:ring-nav-active/40 focus-visible:ring-2'
        )}
      />
      <button
        type="submit"
        disabled={isPending || !value.trim()}
        aria-label={TODO_COPY.addItem}
        className={clsx(
          'shrink-0 transition-opacity disabled:cursor-not-allowed disabled:opacity-40',
          'focus-visible:ring-nav-active/40 rounded-full focus-visible:ring-2 focus-visible:outline-none'
        )}
      >
        <IconBadge size={40}>
          <BiPlus size={20} />
        </IconBadge>
      </button>
    </form>
  );
};
