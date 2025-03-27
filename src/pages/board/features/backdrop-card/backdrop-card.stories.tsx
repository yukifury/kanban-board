import BackdropCard from './backdrop-card.feature.tsx';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BackdropCard> = {
  title: 'board/backdrop-card',
  component: BackdropCard,
  tags: ['autodocs'],
  args: {
    height: 50,
  },
};

export const BackdropCardStory: StoryObj<typeof meta> = {
  args: {
    height: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Backdrop-эффект для BoardCard. Используется до отображение предварительного места переноса и откуда перенос производится.',
      },
    },
  },
};

export default meta;
