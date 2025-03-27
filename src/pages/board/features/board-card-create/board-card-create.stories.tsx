import { Meta, StoryObj } from '@storybook/react';
import { BoardCardCreate } from './board-card-create.feature.tsx';

const meta: Meta<typeof BoardCardCreate> = {
  title: 'board/board-card-create',
  tags: ['autodocs'],
  component: BoardCardCreate,
};

export const BoardCardCreateStory: StoryObj<typeof meta> = {
  parameters: {
    docs: {
      description: {
        story: 'Компонент для создания карточки. Выводится внизу колонки',
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
