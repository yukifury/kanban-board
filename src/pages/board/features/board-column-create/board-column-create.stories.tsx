import { Meta, StoryObj } from '@storybook/react';
import BoardColumnCreate from './board-column-create.feature';

const meta: Meta<typeof BoardColumnCreate> = {
  title: 'board/board-column-create',
  tags: ['autodocs'],
  component: BoardColumnCreate,
};

export const BoardColumnCreateStory: StoryObj<typeof meta> = {
  parameters: {
    docs: {
      description: {
        story: 'Компонент для создания колонки',
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
