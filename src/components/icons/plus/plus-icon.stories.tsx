import type { Meta, StoryObj } from '@storybook/react';
import PlusIcon from './plus-icon.tsx';

const meta: Meta<typeof PlusIcon> = {
  component: PlusIcon,
  title: 'components/icons/PlusIcon',
  tags: ['autodocs'],
  args: {
    className: '',
  },
  parameters: {
    docs: {
      description: 'asd',
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Story: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Иконка плюса',
      },
    },
  },
};

export default meta;
