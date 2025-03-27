import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BoardContextProps, useBoardContext } from '../../widget';
import { MockedFunction } from '@storybook/test';
import {
  useDragAndDrop,
  UseDragAndDropProps,
} from '../../../../hooks/use-drag-and-drop';
import { BoardCard } from './board-card.feature.tsx';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('../../widget', () => ({
  useBoardContext: vi.fn(),
  BasicCard: {},
}));

vi.mock('../../../../hooks/use-drag-and-drop', () => ({
  useDragAndDrop: vi.fn(),
}));

const mockedUseBoardContext = useBoardContext as MockedFunction<
  typeof useBoardContext
>;
const mockedUseDragAndDrop = useDragAndDrop as MockedFunction<
  typeof useDragAndDrop
>;

describe('BoardCard', () => {
  const card = { id: crypto.randomUUID(), value: 'TestCard' };

  beforeEach(() => {
    mockedUseBoardContext.mockReturnValue({
      backdropHeight: 150,
      draggedOverTargetId: '',
    } as BoardContextProps);

    mockedUseDragAndDrop.mockReturnValue({
      isDragging: false,
      handleDrag: vi.fn(),
      handleDragOver: vi.fn(),
      handleDrop: vi.fn(),
      handleDragStart: vi.fn(),
      draggedOverTargetId: '',
      handleDragEnd: vi.fn(),
      handleDragLeave: vi.fn(),
      position: { x: 0, y: 0 },
      dragOffset: { x: 0, y: 0 },
    } as UseDragAndDropProps);
  });

  test('render card', () => {
    render(<BoardCard card={card} />);

    const cardElement = screen.getByText('TestCard');

    expect(cardElement).toBeInTheDocument();
  });

  test('call all BoardCard useDragAndDrop methods', () => {
    const handleDragEnd = vi.fn();
    const handleDragOver = vi.fn();
    const handleDragStart = vi.fn();
    const handleDrag = vi.fn();
    const handleDrop = vi.fn();

    mockedUseDragAndDrop.mockReturnValue({
      dragOffset: { x: 0, y: 0 },
      draggedOverTargetId: '',
      isDragging: false,
      position: { x: 0, y: 0 },
      handleDrag: handleDrag,
      handleDragOver: handleDragOver,
      handleDrop: handleDrop,
      handleDragStart: handleDragStart,
      handleDragEnd: handleDragEnd,
      handleDragLeave: vi.fn(),
    });

    render(<BoardCard card={card} />);

    const cardElement = screen.getByText('TestCard');

    fireEvent.dragStart(cardElement, { clientX: 0, clientY: 0 });
    fireEvent.dragOver(cardElement, { clientX: 0, clientY: 0 });
    fireEvent.drag(cardElement, { clientX: 0, clientY: 0 });
    fireEvent.dragEnd(cardElement, { clientX: 0, clientY: 0 });

    expect(handleDragStart).toHaveBeenCalled();
    expect(handleDragEnd).toHaveBeenCalled();
    expect(handleDrag).toHaveBeenCalled();
    expect(handleDragOver).toHaveBeenCalled();
  });
});
