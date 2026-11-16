import { formatClock } from '@/utils/formatClock';
import { getDayKey } from '@/utils/getDayKey';

import { CalendarEvent } from './types';

export interface AgendaEvent {
  key: string;
  summary: string;
  description?: string;
  isAllDay: boolean;
  /** "Hele dag", "14:30 – 15:00" for today, or just the start time later on. */
  when: string;
  /** The full date and time, written out for the details popup. */
  detailWhen: string;
  location?: string;
  calendar?: string;
  isRecurring: boolean;
}

export interface AgendaDay {
  /** The calendar day, "2026-11-19". */
  key: string;
  /** "Vandaag", "Morgen" or "Do 19". */
  label: string;
  isToday: boolean;
  events: AgendaEvent[];
  /** Events of this day that did not fit and are summarised as "+N meer". */
  hiddenCount: number;
}

/** Rows kept free for the days ahead, so a busy today never hides them all. */
const ROWS_FOR_LATER = 2;

const dayLabelFormat = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const addDays = (dayKey: string, days: number) => {
  const date = new Date(`${dayKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const longDayFormat = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

const shortDayFormat = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
});

const formatLongDay = (dayKey: string) =>
  longDayFormat.format(new Date(`${dayKey}T00:00:00Z`));

const formatShortDay = (dayKey: string) =>
  shortDayFormat.format(new Date(`${dayKey}T00:00:00Z`)).replace(/\./g, '');

const describeWhen = (event: CalendarEvent) => {
  if (event.start.date) {
    // An all-day event's end date is the day after its last day.
    const lastDay = addDays(event.end.date, -1);
    return lastDay > event.start.date
      ? `${formatShortDay(event.start.date)} t/m ${formatShortDay(lastDay)}`
      : `${formatLongDay(event.start.date)} · hele dag`;
  }

  const start = new Date(event.start.dateTime);
  const end = new Date(event.end.dateTime);
  const startKey = getDayKey(start);
  const endKey = getDayKey(end);

  return startKey === endKey
    ? `${formatLongDay(startKey)} · ${formatClock(start)} – ${formatClock(end)}`
    : `${formatShortDay(startKey)} ${formatClock(start)} – ${formatShortDay(endKey)} ${formatClock(end)}`;
};

const formatDay = (dayKey: string, todayKey: string) => {
  if (dayKey === todayKey) {
    return 'Vandaag';
  }
  if (dayKey === addDays(todayKey, 1)) {
    return 'Morgen';
  }
  const label = dayLabelFormat
    .format(new Date(`${dayKey}T00:00:00Z`))
    .replace('.', '');
  return label.charAt(0).toUpperCase() + label.slice(1);
};

/**
 * Lays the coming events out as an agenda of exactly `rows` lines at most.
 *
 * Today always comes first and always takes at least one line, even when it is
 * empty. A busy today is cut short with a "+N meer" line rather than pushing
 * the days ahead off the card.
 */
export const buildAgenda = (
  events: CalendarEvent[],
  now: Date,
  rows: number
): AgendaDay[] => {
  const todayKey = getDayKey(now);

  const upcoming = events
    .flatMap((event) => {
      const isAllDay = Boolean(event.start.date);
      const start = isAllDay ? null : new Date(event.start.dateTime);

      // An all-day event's end date is the day after its last day.
      const hasEnded = isAllDay
        ? event.end.date <= todayKey
        : new Date(event.end.dateTime) <= now;
      if (hasEnded) {
        return [];
      }

      // A multi-day event that already started counts as today.
      const startKey = start ? getDayKey(start) : event.start.date;
      const dayKey = startKey < todayKey ? todayKey : startKey;

      let when = 'Hele dag';
      if (start) {
        when =
          dayKey === todayKey
            ? `${formatClock(start)} – ${formatClock(new Date(event.end.dateTime))}`
            : formatClock(start);
      }

      return [
        {
          dayKey,
          sortKey: `${dayKey} ${isAllDay ? '0' : '1'} ${start?.toISOString() ?? ''}`,
          event: {
            key: `${event.uid ?? event.summary}-${event.start.date ?? event.start.dateTime}`,
            summary: event.summary,
            description: event.description?.trim() || undefined,
            isAllDay,
            when,
            detailWhen: describeWhen(event),
            location: event.location?.trim() || undefined,
            calendar: event.calendar,
            isRecurring: Boolean(event.rrule ?? event.recurrence_id),
          },
        },
      ];
    })
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  const todays = upcoming.filter((entry) => entry.dayKey === todayKey);
  const later = upcoming.filter((entry) => entry.dayKey !== todayKey);

  const todayRows = Math.max(rows - Math.min(ROWS_FOR_LATER, later.length), 1);
  const todayOverflows = todays.length > todayRows;
  // When today overflows, its last line is spent on "+N meer".
  const shownToday = todayOverflows ? todays.slice(0, todayRows - 1) : todays;
  const todayRowsUsed = todayOverflows ? todayRows : Math.max(todays.length, 1);

  const days: AgendaDay[] = [
    {
      key: todayKey,
      label: formatDay(todayKey, todayKey),
      isToday: true,
      events: shownToday.map((entry) => entry.event),
      hiddenCount: todays.length - shownToday.length,
    },
  ];

  for (const entry of later.slice(0, Math.max(rows - todayRowsUsed, 0))) {
    const last = days[days.length - 1];
    if (last.key === entry.dayKey) {
      last.events.push(entry.event);
    } else {
      days.push({
        key: entry.dayKey,
        label: formatDay(entry.dayKey, todayKey),
        isToday: false,
        events: [entry.event],
        hiddenCount: 0,
      });
    }
  }

  return days;
};
