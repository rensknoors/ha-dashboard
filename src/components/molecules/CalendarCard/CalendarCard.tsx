import { useEffect, useState } from 'react';

import { useApiCalendar } from './apiCalendar';

const config = {
  clientId:
    '18277115676-hc6vkd5j02ivjucv4qp17kj6cih5ev8b.apps.googleusercontent.com',
  apiKey: 'AIzaSyCUrP2UV4O3pAz3h0HUp1seBevMl9P7Vck',
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
};
// const config = {
//   clientId: import.meta.env.VITE_GCAL_CLIENT_ID,
//   apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
//   scope: 'https://www.googleapis.com/auth/calendar',
//   discoveryDocs: [
//     'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
//   ],
// };

const CalendarCard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [calendars, setCalendars] = useState<any[]>([]);
  const { initialized, authenticate, signOut, listCalendars } =
    useApiCalendar(config);

  useEffect(() => {
    if (!initialized) {
      const fetchCalendars = async () => {
        const result = await listCalendars();
        if (result && result.items) {
          setCalendars(result.items);
        }
      };

      fetchCalendars();
    }
  }, [initialized, listCalendars]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>CalendarCard</h1>
      {calendars.map((calendar, index) => (
        <div key={index}>
          <h2>{calendar.summary}</h2>
          <p>ID: {calendar.id}</p>
        </div>
      ))}

      <button className="bg-green-800" onClick={authenticate}>
        Sign in
      </button>
      <button className="bg-red-800" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
};

export { CalendarCard };
