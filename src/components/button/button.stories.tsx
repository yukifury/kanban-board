import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button.tsx';

const meta = {
  component: Button,
  title: 'components/Button',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    className: '',
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  args: {
    children: 'Click me',
    disabled: false,
  },
};
export default meta;
