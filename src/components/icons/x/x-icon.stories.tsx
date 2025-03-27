import type { Meta, StoryObj } from '@storybook/react';
import XIcon from './x-icon.tsx';

const meta: Meta<typeof XIcon> = {
  component: XIcon,
  title: 'components/icons/XIcon',
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
        story: 'Иконка крестика',
      },
    },
  },
};

export default meta;
