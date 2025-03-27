import { describe, expect, test, vi } from 'vitest';
import { BoardContextProps, useBoardContext } from '../../widget';
import { MockedFunction } from '@storybook/test';
import { fireEvent, render, screen } from '@testing-library/react';
import { BoardCardCreate } from './board-card-create.feature.tsx';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useColumnContext } from '../board-column';

vi.mock('../board-column', () => ({
  useColumnContext: vi.fn(),
}));

vi.mock('../../widget', () => ({
  useBoardContext: vi.fn(),
}));

const mockedUseBoardContext = useBoardContext as MockedFunction<
  typeof useBoardContext
>;
const mockedUseColumnContext = useColumnContext as MockedFunction<
  typeof useColumnContext
>;

describe('BoardCardCreate', () => {
  mockedUseBoardContext.mockReturnValue({} as BoardContextProps);
  mockedUseColumnContext.mockReturnValue({ columnId: '123' });

  test('should create card', async () => {
    const createCard = vi.fn();

    mockedUseBoardContext.mockReturnValue({
      createCard: createCard,
    } as unknown as BoardContextProps);
    mockedUseColumnContext.mockReturnValue({ columnId: '123' });

    render(<BoardCardCreate />);

    const footerElement = screen.getByText('Добавить еще одну карточку');

    fireEvent.click(footerElement);

    const creationElement = screen.getByPlaceholderText(
      'Введите название карточки',
    );
    const createCardButton = screen.getByText('Добавить карточку');

    expect(creationElement).toBeInTheDocument();
    expect(createCardButton).toBeInTheDocument();

    await userEvent.type(creationElement, 'TestCardCustom');

    fireEvent.click(createCardButton);

    expect(createCard).toHaveBeenCalledOnce();
  });
});
