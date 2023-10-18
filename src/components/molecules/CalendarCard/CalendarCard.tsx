import { useGoogleLogin } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

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

  const fetchEvents = async () => {
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

  const {
    data: events,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    enabled: isAuthenticated,
  });

  if (isAuthenticated && isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full">
          {events?.map((event) => (
            <div className="flex items-center gap-4" key={event.id}>
              <div className="h-4 w-4 rounded-full bg-gray-500"></div>
              {event.summary}
            </div>
          ))}
        </div>
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
