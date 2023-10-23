export type ConfigApiCalendar = {
  apiKey: string;
  clientId: string;
  discoveryDocs: string[];
  scope: string;
  hosted_domain?: string;
};

export type DateFormat = {
  dateTime: string;
  date: string;
};

export interface CalendarEvent {
  start: DateFormat;
  end: DateFormat;
  summary: string;
  location?: string;
  description?: string;
  uid?: string;
  recurrence_id?: string;
  rrule?: string;
}
