import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BasicColumn, BoardContextProps, useBoardContext } from '../../widget';
import { MockedFunction } from '@storybook/test';
import { fireEvent, render, screen } from '@testing-library/react';
import { BoardColumn } from './board-column.feature.tsx';
import '@testing-library/jest-dom';
import {
  useDragAndDrop,
  UseDragAndDropProps,
} from '../../../../hooks/use-drag-and-drop';

vi.mock('../../widget', () => ({
  useBoardContext: vi.fn(),
  BasicCard: {},
}));

vi.mock('.board-column.context.ts', () => ({
  useColumnContext: vi.fn(),
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

describe('BoardColumn', () => {
  const column: BasicColumn = {
    id: crypto.randomUUID(),
    name: 'TestColumn',
    children: [
      { id: crypto.randomUUID(), value: 'TestCard1' },
      { id: crypto.randomUUID(), value: 'TestCard2' },
    ],
  };

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

  test('render column', () => {
    render(<BoardColumn column={column} />);

    const columnElement = screen.getByText('TestColumn');

    expect(columnElement).toBeInTheDocument();
  });

  test('should handle onDrop && onDragOver', () => {
    const handleDragOver = vi.fn();
    const handleDrop = vi.fn();

    mockedUseDragAndDrop.mockReturnValue({
      isDragging: false,
      handleDrag: vi.fn(),
      handleDragOver: handleDragOver,
      handleDrop: handleDrop,
      handleDragStart: vi.fn(),
      draggedOverTargetId: '',
      handleDragEnd: vi.fn(),
      handleDragLeave: vi.fn(),
      position: { x: 0, y: 0 },
      dragOffset: { x: 0, y: 0 },
    } as UseDragAndDropProps);

    render(<BoardColumn column={column} />);

    const footerElement = screen.getByText('Добавить еще одну карточку');

    fireEvent.dragOver(footerElement, {
      clientX: 0,
      clientY: 0,
    });
    fireEvent.drop(footerElement);

    expect(handleDragOver).toHaveBeenCalled();
    expect(handleDrop).toHaveBeenCalled();
  });
});
