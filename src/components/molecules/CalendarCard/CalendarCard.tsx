import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

import { CalendarEvent } from './types';

// const config = {
//   clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//   apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
//   scope: 'https://www.googleapis.com/auth/calendar',
//   discoveryDocs: [
//     'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
//   ],
// };

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [events, setEvents] = useState<CalendarEvent[]>();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      setIsAuthenticated(true);

      getEvents();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const getEvents = async () => {
    console.log({ isAuthenticated });
    const calendarId = calendars.find((calendar) => calendar.name === 'Gezin')
      ?.id;

    const params = new URLSearchParams({
      maxResults: '10',
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    const eventsList = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    ).then((response) => response.json());

    console.log('setting events:', eventsList.items);

    setEvents(eventsList.items);
  };

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
          <button onClick={getEvents}>get events</button>
        </div>
      ) : (
        <button onClick={() => googleLogin()}>Login</button>
      )}
    </>
  );
};

export { CalendarCard };
