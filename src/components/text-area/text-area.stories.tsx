import { TextArea } from './text-area.tsx';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'components/text-area',
  tags: ['autodocs'],
  args: {
    defaultValue: '',
    className: '',
    placeholder: 'Type here...',
  },
};

export default meta;

export const TextAreaStory: StoryObj<typeof meta> = {
  args: {
    defaultValue: '',
    className: '',
    placeholder: 'Type here...',
    style: { width: '250px' },
  },
};
