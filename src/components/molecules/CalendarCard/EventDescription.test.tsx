import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EventDescription } from './EventDescription';

describe('EventDescription', () => {
  it('keeps the line breaks of a plain-text description', () => {
    const { container } = render(
      <EventDescription description={'Regel een\nRegel twee'} />
    );

    expect(container.querySelector('p')?.textContent).toBe(
      'Regel een\nRegel twee'
    );
  });

  it('renders basic HTML formatting', () => {
    const { container } = render(
      <EventDescription description="<p>Neem <b>zwemspullen</b> mee</p><ul><li>Handdoek</li></ul>" />
    );

    expect(container.querySelector('strong')?.textContent).toBe('zwemspullen');
    expect(container.querySelector('li')?.textContent).toBe('Handdoek');
  });

  it('never passes scripts, handlers or links through', () => {
    const { container } = render(
      <EventDescription description='<img src="x" onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)" onclick="alert(4)">Klik</a>' />
    );

    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('a')).toBeNull();
    expect(container.innerHTML).not.toContain('alert');
    expect(container.textContent).toBe('Klik');
  });
});
