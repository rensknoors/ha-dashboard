import { useHass } from '@hakit/core';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { BiCalendarX } from 'react-icons/bi';

import { EventDialog } from './EventDialog';
import { AgendaEvent, buildAgenda } from './buildAgenda';
import { htmlToText } from './htmlToText';
import { CalendarEvent } from './types';

const CALENDARS = [
  { entity: 'calendar.gezin', name: 'Gezin' },
  { entity: 'calendar.feestdagen_in_nederland', name: 'Feestdagen' },
  { entity: 'calendar.birthdays', name: 'Verjaardagen' },
];
const DAYS_AHEAD = 7;
const AGENDA_ROWS = 6;

const isBirthday = (summary: string) => {
  // Summary contains substring 'verjaardag', 'birthday' or 'jarig'
  return (
    summary.toLowerCase().includes('verjaardag') ||
    summary.toLowerCase().includes('birthday') ||
    summary.toLowerCase().includes('jarig')
  );
};

const formatTitle = (summary: string) =>
  `${isBirthday(summary) ? '🎉 ' : ''}${summary}`;

const CalendarCard = () => {
  const callApi = useHass((state) => state.helpers.callApi);
  const [openEvent, setOpenEvent] = useState<AgendaEvent | null>(null);

  const fetchEvents = async () => {
    const start = new Date(new Date().setHours(0, 0, 0, 0));
    const end = new Date(start);
    end.setDate(start.getDate() + DAYS_AHEAD);
    const period = `?start=${start.toISOString()}&end=${end.toISOString()}`;

    const perCalendar = await Promise.all(
      CALENDARS.map(async ({ entity, name }) => {
        const response = await callApi<CalendarEvent[]>(
          `/calendars/${entity}${period}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_HA_LONG_LIVED_TOKEN}`,
            },
          }
        );
        return response.status === 'error'
          ? []
          : response.data.map((event) => ({ ...event, calendar: name }));
      })
    );

    return perCalendar.flat();
  };

  const {
    data: events,
    isPending,
    isError,
    error,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });

  if (isPending) {
    return (
      <div className="rounded-tile h-6 w-56 animate-pulse bg-white/6 motion-reduce:animate-none" />
    );
  }

  // Only show error if there are no events to show
  if (isError && !events) {
    console.error(error);
    return (
      <span className="text-mist-muted text-sm">Agenda niet beschikbaar</span>
    );
  }

  const days = buildAgenda(events, new Date(dataUpdatedAt), AGENDA_ROWS);

  if (days.every((day) => day.events.length === 0)) {
    return (
      <div className="text-mist-muted flex items-center justify-center gap-3">
        <BiCalendarX className="h-5 w-5" />
        Geen afspraken deze week
      </div>
    );
  }

  // One grid for the whole agenda: day, dot, time and title each keep a single
  // column, so every row lines up whichever day it belongs to.
  return (
    <>
      <div className="grid w-full max-w-[27rem] grid-cols-[auto_auto_auto_minmax(0,1fr)] items-center gap-x-3">
        {days.map((day, dayIndex) => {
          // Days are set apart by space alone.
          const dayGap = dayIndex > 0 && 'mt-2';
          const dayLabel = (
            <span
              className={clsx(
                'py-1 pr-2 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase',
                day.isToday ? 'text-mist' : 'text-mist-muted',
                dayGap
              )}
            >
              {day.label}
            </span>
          );

          if (day.events.length === 0) {
            return (
              <Fragment key={day.key}>
                {dayLabel}
                <span className="text-mist-muted col-span-2 col-start-3 py-1">
                  Geen afspraken
                </span>
              </Fragment>
            );
          }

          return (
            <Fragment key={day.key}>
              {day.events.map((event, eventIndex) => {
                const rowGap = eventIndex === 0 && dayGap;

                return (
                  <Fragment key={event.key}>
                    {eventIndex === 0 ? dayLabel : <span />}
                    {/* `contents` lets the button's cells sit in the shared grid. */}
                    <button
                      type="button"
                      onClick={() => setOpenEvent(event)}
                      className="group contents cursor-pointer text-left"
                    >
                      <span
                        className={clsx(
                          'flex items-center self-stretch group-active:opacity-50',
                          rowGap
                        )}
                      >
                        <span
                          className={clsx(
                            'h-1.5 w-1.5 rounded-full',
                            event.isAllDay ? 'bg-sun' : 'bg-rain',
                            !day.isToday && 'opacity-50'
                          )}
                        />
                      </span>
                      <span
                        className={clsx(
                          'text-mist-muted py-1 text-sm whitespace-nowrap tabular-nums group-active:opacity-50',
                          rowGap
                        )}
                      >
                        {event.when}
                      </span>
                      <span
                        className={clsx(
                          'truncate py-1 group-active:opacity-50',
                          day.isToday ? 'font-semibold' : 'text-mist-muted',
                          rowGap
                        )}
                      >
                        {formatTitle(event.summary)}
                        {day.isToday && event.description && (
                          <span className="text-mist-muted font-normal">
                            {' · '}
                            {htmlToText(event.description)}
                          </span>
                        )}
                      </span>
                    </button>
                  </Fragment>
                );
              })}
              {day.hiddenCount > 0 && (
                <span className="text-mist-muted col-span-2 col-start-3 py-1 text-sm">
                  +{day.hiddenCount} meer
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
      <EventDialog
        event={openEvent}
        title={openEvent ? formatTitle(openEvent.summary) : ''}
        onClose={() => setOpenEvent(null)}
      />
    </>
  );
};

export { CalendarCard };
