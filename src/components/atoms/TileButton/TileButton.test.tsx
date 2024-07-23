import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TileButton, TileButtonProps } from './TileButton';

const mockProps: TileButtonProps = {
  background: 'bg-blue-300',
  icon: 'mdi:home',
  path: '/home',
};

vi.mock('@hakit/core', () => ({
  useIcon: (icon: string) => `<svg>Mocked Icon: ${icon}</svg>`,
}));

test('TileButton', () => {
  render(
    <MemoryRouter>
      <TileButton {...mockProps} />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link');
  expect(linkElement.getAttribute('href')).toBe(mockProps.path);

  expect(linkElement.classList.contains('bg-blue-300')).toBe(true);
});
