import { GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';

import { EventsList } from './types';

const config = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
};

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
  const [events, setEvents] = useState<EventsList>();

  const getEvents = () => {
    function initClient() {
      gapi.client
        .init(config)
        .then(function () {
          return gapi.client.calendar.events.list({
            calendarId: calendars.find((calendar) => calendar.name === 'Gezin')
              ?.id,
            timeMin: new Date().toISOString(),
            timeMax: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            maxResults: 10,
          });
        })
        .then(
          (response) => {
            setEvents(response.result);
          },
          (reason) => {
            console.log('Error: ' + reason.result.error.message);
          }
        );
    }

    gapi.load('client', initClient);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      {!!events &&
        events?.items?.map((event) => (
          <div className="text" key={event.id}>
            {event.summary}
          </div>
        ))}
      <GoogleLogin
        onSuccess={(credentialResponse) => console.log(credentialResponse)}
        onError={() => {
          console.log('Login Failed');
        }}
        auto_select
      />
    </div>
  );
};

export { CalendarCard };
