import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TileButton, TileButtonProps } from './TileButton';

const mockProps: TileButtonProps = {
  icon: <div>Home</div>,
  label: 'Home',
  path: '/home',
};

test('TileButton inactive', () => {
  render(
    <MemoryRouter initialEntries={['/other']}>
      <TileButton {...mockProps} />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link', { name: 'Home' });
  expect(linkElement.getAttribute('href')).toBe(mockProps.path);
  expect(linkElement.classList.contains('bg-nav-active')).toBe(false);
  expect(linkElement.classList.contains('text-mist-muted')).toBe(true);
});

test('TileButton active', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <TileButton {...mockProps} />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link', { name: 'Home' });
  expect(linkElement.classList.contains('bg-nav-active')).toBe(true);
  expect(linkElement.classList.contains('text-canvas')).toBe(true);
});

test('TileButton home is inactive on nested routes', () => {
  render(
    <MemoryRouter initialEntries={['/energy']}>
      <TileButton icon={<div />} label="Home" path="/" />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link', { name: 'Home' });
  expect(linkElement.classList.contains('bg-nav-active')).toBe(false);
});
