import { act, fireEvent, render, screen } from '@testing-library/react';

import { Card } from './Card';

vi.useFakeTimers();

const mockOnClick = vi.fn();
const mockOnLongPress = vi.fn();

const defaultProps = {
  onClick: mockOnClick,
  onLongPress: mockOnLongPress,
};

describe('Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls onClick when short pressed', () => {
    render(<Card {...defaultProps}>Hello world</Card>);

    const card = screen.getByText('Hello world');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnLongPress).not.toHaveBeenCalled();
  });

  it('calls onLongPress when long pressed, not onClick', () => {
    render(<Card {...defaultProps}>Hello world</Card>);

    const card = screen.getByText('Hello world');
    fireEvent.mouseDown(card);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    fireEvent.mouseUp(card);

    expect(mockOnLongPress).toHaveBeenCalledTimes(1);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
