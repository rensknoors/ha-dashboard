import { useHass } from '@hakit/core';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useCallback } from 'react';
import { BiCalendar, BiSun } from 'react-icons/bi';

import { CalendarEvent } from './types';

const CalendarCard = () => {
  const { callApi } = useHass();

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  const fetchEvents = useCallback(async () => {
    const response = await callApi<CalendarEvent[]>(
      `/calendars/calendar.gezin?start=${startOfDay}&end=${endOfDay}`,
      { method: 'GET' }
    );
    if (response.status === 'error') {
      throw new Error(response.data);
    }
    return response.data;
  }, [callApi, endOfDay, startOfDay]);

  const formatToTimeString = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const {
    data: events,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });

  if (isPending) return <div>Loading...</div>;

  // Only show error if there are no events to show
  if (isError && !events.length) {
    console.error(error);
    return (
      <div>
        Error: {error.name} - {error.message}
      </div>
    );
  }

  return (
    <>
      {events?.length === 0 && (
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <BiSun style={{ height: 20, width: 20 }} color="#FFC107" />
          Geen events vandaag
        </div>
      )}
      {events?.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-4">
            <BiCalendar style={{ height: 20, width: 20 }} />
            <span className="text-xl text-white">Kalender</span>
          </div>
          <div>
            {events?.map((event) => (
              <div className="flex items-center gap-4" key={event.uid}>
                <div
                  className={clsx(
                    'h-2 w-2 rounded-full',
                    event.start && 'bg-blue-300',
                    event.start && 'bg-green-300'
                  )}
                ></div>
                <span className="text-slate-400">
                  {event.start.date && 'Hele dag'}
                  {event.start.dateTime &&
                    `${formatToTimeString(event.start.dateTime)} -
                        ${formatToTimeString(event.end.dateTime)}
                      `}
                </span>
                <span className="font-semibold">{event.summary}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export { CalendarCard };
