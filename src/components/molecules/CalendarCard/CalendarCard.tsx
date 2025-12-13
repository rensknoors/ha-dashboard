import { useHass } from '@hakit/core';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useCallback } from 'react';
import { BiCalendar, BiCalendarX } from 'react-icons/bi';

import { CalendarEvent } from './types';

const isBirthday = (summary: string) => {
  // Summary contains substring 'verjaardag', 'birthday' or 'jarig'
  return (
    summary.toLowerCase().includes('verjaardag') ||
    summary.toLowerCase().includes('birthday') ||
    summary.toLowerCase().includes('jarig')
  );
};

const CalendarCard = () => {
  const callApi = useHass((state) => state.helpers.callApi);

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  const fetchEvents = useCallback(async () => {
    const fetchFromEntity = async (endpoint) => {
      const response = await callApi<CalendarEvent[]>(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_HA_LONG_LIVED_TOKEN}`,
        },
      });
      if (response.status === 'error') {
        return [];
      }
      return response.data;
    };
    const periodString = `?start=${startOfDay}&end=${endOfDay}`;

    const familyCalendar = await fetchFromEntity(
      `/calendars/calendar.gezin${periodString}`
    );
    const holidaysCalendar = await fetchFromEntity(
      `/calendars/calendar.feestdagen_in_nederland${periodString}`
    );
    const birthdayCalendar = await fetchFromEntity(
      `/calendars/calendar.birthdays${periodString}`
    );

    return [...familyCalendar, ...holidaysCalendar, ...birthdayCalendar];
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
  if (isError && !events) {
    console.error(error);
    return (
      <span>
        {error.name}: {error.message}
      </span>
    );
  }

  return (
    <>
      {events.length === 0 && (
        <div className="flex items-center justify-center gap-3 text-slate-400">
          <BiCalendarX className="h-6 w-6 text-white" />
          Geen events vandaag
        </div>
      )}
      {events.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-4">
            <BiCalendar className="h-5 w-5" />
            <span className="text-xl text-white">Kalender</span>
          </div>
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <div
                key={event.uid}
                className="grid grid-cols-[min-content_auto]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={clsx(
                      'h-2 w-2 rounded-full',
                      event.start.date && 'bg-blue-300',
                      event.start.dateTime && 'bg-green-300'
                    )}
                  ></div>
                  <span className="w-28 text-slate-400">
                    {event.start.date && 'Hele dag'}
                    {event.start.dateTime &&
                      `${formatToTimeString(event.start.dateTime)} -
                        ${formatToTimeString(event.end.dateTime)}
                      `}
                  </span>
                </div>

                <span className="font-semibold">
                  {`${isBirthday(event.summary) ? '🎉' : ''} ${event.summary}`}
                </span>

                {event.description && (
                  <span className="col-start-2 line-clamp-2 text-slate-400">{`${event.description}`}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export { CalendarCard };
