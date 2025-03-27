import { Meta, StoryObj } from '@storybook/react';
import { BoardCard } from './board-card.feature.tsx';

const meta: Meta<typeof BoardCard> = {
  title: 'board/board-card',
  tags: ['autodocs'],
  component: BoardCard,
};

export const BoardCardStory: StoryObj<typeof meta> = {
  args: {
    card: { value: 'Test card', id: crypto.randomUUID() },
  },
  parameters: {
    docs: {
      description: {
        story:
          'BoardCard-компонент для отрисовки объектов BasicCard в kanban-доске.',
      },
    },
  },
  decorators: (Story) => (
    <div style={{ fontFamily: 'Montserrat' }}>
      <Story />
    </div>
  ),
};

export default meta;
