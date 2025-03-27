import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BoardContextProps, useBoardContext } from '../../widget';
import { MockedFunction } from '@storybook/test';
import { render, screen } from '@testing-library/react';
import BoardColumnCreate from './board-column-create.feature.tsx';
import userEvent from '@testing-library/user-event';

vi.mock('../../widget', () => ({
  useBoardContext: vi.fn(),
}));

const mockedUseBoardContext = useBoardContext as MockedFunction<
  typeof useBoardContext
>;
describe('BoardColumnCreate', () => {
  mockedUseBoardContext.mockReturnValue({
    createColumn: vi.fn(),
  } as unknown as BoardContextProps);

  test('should render in the document and call createColumn', async () => {
    const createColumn = vi.fn();

    mockedUseBoardContext.mockReturnValue({
      createColumn: createColumn,
    } as unknown as BoardContextProps);

    render(<BoardColumnCreate />);

    const columnCreateElement = screen.getByText('Добавить еще одну колонку');

    await userEvent.click(columnCreateElement);

    const columnCreationElement = screen.getByPlaceholderText(
      'Введите название колонки',
    );
    const columnCreateButton = screen.getByText('Добавить колонку');

    await userEvent.type(columnCreationElement, 'TestColumn');
    await userEvent.click(columnCreateButton);

    expect(createColumn).toHaveBeenCalledOnce();
  });
});
