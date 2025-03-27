import { Meta, StoryObj } from '@storybook/react';
import { BoardWidget } from './board.widget.tsx';

const meta: Meta<typeof BoardWidget> = {
  title: 'board/board-widget',
  tags: ['autodocs'],
  component: BoardWidget,
};

export const BoardWidgetStory: StoryObj<typeof meta> = {
  parameters: {
    docs: {
      description: {
        story:
          'Виджет доски. Содержит в себе контекст и провайдеры. По умолчанию содержит в себе dummy-дату',
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
