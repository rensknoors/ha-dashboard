import { useApiCalendar } from './apiCalendar';

const config = {
  clientId: import.meta.env.VITE_GCAL_CLIENT_ID,
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
};

const CalendarCard = () => {
  // const [isGapiLoaded, setGapiLoaded] = useState(false);
  // const calendar = useMemo(() => new ApiCalendar(config), []);

  // useEffect(() => {
  //   // TODO: Find a better way to check if gapi is loaded. Make a PR to react-google-calendar-api or fork it.
  //   setTimeout(() => {
  //     calendar.onLoad(() => {
  //       setGapiLoaded(true);
  //     });
  //   }, 1000);
  // }, [calendar]);

  // console.log(calendar);

  const apiCalendar = useApiCalendar(config);

  if (!apiCalendar.initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>CalendarCard</h1>

      <button className="bg-green-800" onClick={apiCalendar.signIn}>
        Sign in
      </button>
      <button className="bg-red-800" onClick={apiCalendar.signOut}>
        Sign out
      </button>
    </div>
  );
};

export { CalendarCard };
