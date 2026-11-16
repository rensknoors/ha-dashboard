import { ReactNode, useEffect, useRef } from 'react';
import { BiCalendar, BiMap, BiRepeat, BiTime, BiX } from 'react-icons/bi';

import { EventDescription } from './EventDescription';
import { AgendaEvent } from './buildAgenda';

interface EventDialogProps {
  /** The event to show; null keeps the dialog closed. */
  event: AgendaEvent | null;
  title: string;
  onClose: () => void;
}

const Detail = ({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <span className="text-mist-muted mt-0.5 shrink-0">{icon}</span>
    <span className="min-w-0 break-words">{children}</span>
  </div>
);

export const EventDialog = ({ event, title, onClose }: EventDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // The native dialog brings the backdrop, focus trap and Escape handling,
  // but it only opens as a modal through its own method.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (event && !dialog.open) {
      dialog.showModal();
    } else if (!event && dialog.open) {
      dialog.close();
    }
  }, [event]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // A tap on the backdrop lands on the dialog element itself.
      onClick={(click) => {
        if (click.target === click.currentTarget) {
          onClose();
        }
      }}
      className="rounded-bento border-surface-border bg-surface text-mist m-auto w-[32rem] max-w-[calc(100vw-3rem)] border p-0 shadow-[0_32px_64px_-24px_rgb(0_0_0/80%)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {event && (
        <div className="flex max-h-[calc(100vh-6rem)] flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl leading-tight font-bold tracking-tight">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="bg-surface-elevated text-mist-muted -mt-1 -mr-1 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors active:bg-white/15"
            >
              <BiX size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <Detail icon={<BiTime size={18} />}>
              <span className="inline-block first-letter:uppercase">
                {event.detailWhen}
              </span>
            </Detail>
            {event.location && (
              <Detail icon={<BiMap size={18} />}>{event.location}</Detail>
            )}
            {event.calendar && (
              <Detail icon={<BiCalendar size={18} />}>{event.calendar}</Detail>
            )}
            {event.isRecurring && (
              <Detail icon={<BiRepeat size={18} />}>Terugkerend</Detail>
            )}
          </div>

          {event.description && (
            <div className="text-mist/80 min-h-0 overflow-y-auto border-t border-white/10 pt-5 leading-relaxed">
              <EventDescription description={event.description} />
            </div>
          )}
        </div>
      )}
    </dialog>
  );
};
