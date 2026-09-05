import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TileButton, TileButtonProps } from './TileButton';

const mockProps: TileButtonProps = {
  tone: 'blue',
  icon: 'mdi:home',
  path: '/home',
};

vi.mock('@hakit/core', () => ({
  useIcon: (icon: string) => `<svg>Mocked Icon: ${icon}</svg>`,
}));

test('TileButton', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <TileButton {...mockProps} />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link');
  expect(linkElement.getAttribute('href')).toBe(mockProps.path);

  // Active route: the tone's chip color shows.
  expect(linkElement.classList.contains('bg-chip-blue')).toBe(true);
});

test('TileButton shows no tone color when its route is not active', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <TileButton {...mockProps} />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link');
  expect(linkElement.classList.contains('bg-chip-blue')).toBe(false);
});
