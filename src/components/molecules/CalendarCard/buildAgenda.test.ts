import { describe, expect, it } from 'vitest';

import { buildAgenda } from './buildAgenda';
import { CalendarEvent } from './types';

// Monday 16 November 2026, 10:00 in Amsterdam.
const now = new Date('2026-11-16T10:00:00+01:00');

const allDay = (summary: string, start: string, end: string) =>
  ({
    summary,
    uid: summary,
    start: { date: start },
    end: { date: end },
  }) as CalendarEvent;

const timed = (summary: string, start: string, end: string) =>
  ({
    summary,
    uid: summary,
    start: { dateTime: `${start}:00+01:00` },
    end: { dateTime: `${end}:00+01:00` },
  }) as CalendarEvent;

const todayAt = (summary: string, hour: number) =>
  timed(summary, `2026-11-16T${hour}:00`, `2026-11-16T${hour}:30`);

const summaries = (days: ReturnType<typeof buildAgenda>) =>
  days.map((day) => [day.label, ...day.events.map((event) => event.summary)]);

describe('buildAgenda', () => {
  it('always starts with today, even when it is empty', () => {
    expect(buildAgenda([], now, 6)).toEqual([
      {
        key: '2026-11-16',
        label: 'Vandaag',
        isToday: true,
        events: [],
        hiddenCount: 0,
      },
    ]);
  });

  it('writes the date and time out in full for the details popup', () => {
    const [today, tomorrow] = buildAgenda(
      [
        todayAt('Tandarts', 14),
        allDay('Vakantie', '2026-11-14', '2026-11-20'),
        allDay('Verjaardag', '2026-11-17', '2026-11-18'),
        timed('Feest', '2026-11-17T22:00', '2026-11-18T01:00'),
      ],
      now,
      6
    );

    expect(today.events.map((event) => event.detailWhen)).toEqual([
      'za 14 nov t/m do 19 nov',
      'maandag 16 november · 14:00 – 14:30',
    ]);
    expect(tomorrow.events.map((event) => event.detailWhen)).toEqual([
      'dinsdag 17 november · hele dag',
      'di 17 nov 22:00 – wo 18 nov 01:00',
    ]);
  });

  it('carries location, calendar and recurrence through', () => {
    const [today] = buildAgenda(
      [
        {
          ...todayAt('Tandarts', 14),
          location: ' Dorpsstraat 1 ',
          description: '   ',
          calendar: 'Gezin',
          rrule: 'FREQ=YEARLY',
        },
        todayAt('Los', 15),
      ],
      now,
      6
    );

    expect(today.events[0]).toMatchObject({
      location: 'Dorpsstraat 1',
      description: undefined,
      calendar: 'Gezin',
      isRecurring: true,
    });
    expect(today.events[1]).toMatchObject({
      location: undefined,
      isRecurring: false,
    });
  });

  it('groups events by day with a label per day', () => {
    const days = buildAgenda(
      [
        timed('Voetbal', '2026-11-19T19:00', '2026-11-19T20:30'),
        allDay('Verjaardag', '2026-11-17', '2026-11-18'),
        timed('Ophalen', '2026-11-17T08:15', '2026-11-17T08:30'),
        todayAt('Tandarts', 14),
      ],
      now,
      6
    );

    expect(summaries(days)).toEqual([
      ['Vandaag', 'Tandarts'],
      ['Morgen', 'Verjaardag', 'Ophalen'],
      ['Do 19', 'Voetbal'],
    ]);
    expect(days.map((day) => day.isToday)).toEqual([true, false, false]);
  });

  it('shows a time range today and only the start time later', () => {
    const [today, tomorrow] = buildAgenda(
      [
        todayAt('Tandarts', 14),
        allDay('Feestdag', '2026-11-16', '2026-11-17'),
        timed('Ophalen', '2026-11-17T08:15', '2026-11-17T08:30'),
      ],
      now,
      6
    );

    expect(today.events.map((event) => event.when)).toEqual([
      'Hele dag',
      '14:00 – 14:30',
    ]);
    expect(tomorrow.events[0].when).toBe('08:15');
  });

  it('cuts a busy today short and keeps room for the days ahead', () => {
    const days = buildAgenda(
      [
        ...[11, 12, 13, 14, 15, 16, 17, 18].map((hour) =>
          todayAt(`Afspraak ${hour}`, hour)
        ),
        allDay('Morgen 1', '2026-11-17', '2026-11-18'),
        allDay('Overmorgen', '2026-11-18', '2026-11-19'),
        allDay('Later', '2026-11-20', '2026-11-21'),
      ],
      now,
      6
    );

    expect(summaries(days)).toEqual([
      ['Vandaag', 'Afspraak 11', 'Afspraak 12', 'Afspraak 13'],
      ['Morgen', 'Morgen 1'],
      ['Wo 18', 'Overmorgen'],
    ]);
    expect(days[0].hiddenCount).toBe(5);
  });

  it('gives today every row when nothing is coming up', () => {
    const days = buildAgenda(
      [11, 12, 13, 14, 15, 16, 17].map((hour) =>
        todayAt(`Afspraak ${hour}`, hour)
      ),
      now,
      6
    );

    expect(days).toHaveLength(1);
    expect(days[0].events).toHaveLength(5);
    expect(days[0].hiddenCount).toBe(2);
  });

  it('never uses more rows than it was given', () => {
    const days = buildAgenda(
      [
        todayAt('A', 11),
        todayAt('B', 12),
        ...[17, 18, 19, 20, 21, 22].map((day) =>
          allDay(`Dag ${day}`, `2026-11-${day}`, `2026-11-${day + 1}`)
        ),
      ],
      now,
      6
    );
    const rowsUsed = days.reduce(
      (sum, day) =>
        sum + Math.max(day.events.length, 1) + (day.hiddenCount > 0 ? 1 : 0),
      0
    );

    expect(rowsUsed).toBe(6);
    expect(summaries(days)[0]).toEqual(['Vandaag', 'A', 'B']);
  });

  it('drops what has ended and counts a running multi-day event as today', () => {
    const [today] = buildAgenda(
      [
        timed('Ontbijt', '2026-11-16T08:00', '2026-11-16T09:00'),
        allDay('Gisteren', '2026-11-15', '2026-11-16'),
        allDay('Vakantie', '2026-11-14', '2026-11-20'),
        timed('Bezig', '2026-11-16T09:30', '2026-11-16T11:00'),
      ],
      now,
      6
    );

    expect(today.events.map((event) => event.summary)).toEqual([
      'Vakantie',
      'Bezig',
    ]);
  });

  it('gives repeated events distinct keys', () => {
    const days = buildAgenda(
      [
        allDay('Afval', '2026-11-17', '2026-11-18'),
        allDay('Afval', '2026-11-19', '2026-11-20'),
      ],
      now,
      6
    );
    const keys = days.flatMap((day) => day.events.map((event) => event.key));

    expect(new Set(keys).size).toBe(2);
  });
});
