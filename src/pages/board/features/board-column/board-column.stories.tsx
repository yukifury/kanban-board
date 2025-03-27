import { BoardColumn } from './board-column.feature.tsx';
import { Meta, StoryObj } from '@storybook/react';
import { BoardCard } from '../board-card';

const meta: Meta<typeof BoardColumn> = {
  title: 'board/board-column',
  tags: ['autodocs'],
  component: BoardColumn,
  subcomponents: { BoardCard },
};

export const BoardColumnStory: StoryObj<typeof meta> = {
  parameters: {
    docs: {
      description: {
        story:
          'Компонент колонки которая содержит в себе карточки, кнопку и форму создания новой карточки, "дропзону" для перетаскивания другой карточки в колонку.',
      },
    },
  },
  args: {
    column: {
      name: 'Test Column',
      id: crypto.randomUUID(),
      children: [
        {
          value: 'test-card1',
          id: crypto.randomUUID(),
        },
        {
          value: 'test-card2',
          id: crypto.randomUUID(),
        },
      ],
    },
  },
  decorators: (Story) => (
    <div style={{ fontFamily: 'Montserrat' }}>
      <Story />
    </div>
  ),
};

export default meta;
