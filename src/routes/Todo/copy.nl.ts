export const TODO_COPY = {
  addPlaceholder: 'Nieuw item toevoegen...',
  addItem: 'Item toevoegen',
  loading: 'Laden...',
  completed: 'Voltooid',
  removeItem: (summary: string) => `Verwijder ${summary}`,
  reminders: {
    navLabel: 'Herinneringen',
    title: 'Herinneringen',
    subtitle: 'Taken en afspraken om niet te vergeten',
    emptyLabel: 'Geen herinneringen',
  },
} as const;
