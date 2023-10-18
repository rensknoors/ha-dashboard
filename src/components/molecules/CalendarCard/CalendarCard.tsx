import { useGoogleLogin } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { BiCalendar, BiSun } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';

import { CalendarEvent } from './types';

const calendars = [
  {
    name: 'Rens',
    id: 'primary',
  },
  {
    name: 'Gezin',
    id: '09b81b7e3b43de21e3dd53e271d4c03ceea4f9240c9efcff399e34de7e4d13f1@group.calendar.google.com',
  },
];

const CalendarCard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true' || false
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || ''
  );

  const fetchEvents = async (): Promise<CalendarEvent[]> => {
    const calendarId = calendars.find((calendar) => calendar.name === 'Gezin')
      ?.id;

    const params = new URLSearchParams({
      maxResults: '10',
      timeMin: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      timeMax: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    });

    const eventsList = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    ).then((response) => response.json());
    return eventsList.items;
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      localStorage.setItem('accessToken', tokenResponse.access_token);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    },
    onError: (errorResponse) => console.error(errorResponse),
  });

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
    enabled: isAuthenticated && !!accessToken,
  });

  if (isAuthenticated && isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {isAuthenticated ? (
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
                  <div className="flex items-center gap-4" key={event.id}>
                    <div
                      className={clsx(
                        'h-2 w-2 rounded-full',
                        event.start.date && 'bg-blue-300',
                        event.start.dateTime && 'bg-green-300'
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
      ) : (
        <button
          className="rounded-lg border border-blue-600 px-3 py-2 text-white shadow-md hover:bg-blue-700 focus:border-blue-800 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={() => googleLogin()}
        >
          <div className="flex items-center gap-3">
            <FcGoogle />
            <span>Login with Google</span>
          </div>
        </button>
      )}
    </>
  );
};

export { CalendarCard };
