import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextArea } from './text-area.tsx';
import '@testing-library/jest-dom';
import styles from './text-area.module.css';
import userEvent from '@testing-library/user-event';

test('should render textarea, input some text and render styles', () => {
  render(
    <TextArea placeholder={'Enter text...'} className={styles.textarea} />,
  );

  const textarea = screen.getByPlaceholderText('Enter text...');

  expect(textarea).toBeInTheDocument();
  expect(textarea).toHaveClass(styles.textarea);
});

test('should calls onChange handler when typing', async () => {
  const handleChange = vi.fn();

  render(<TextArea placeholder={'Write something'} onChange={handleChange} />);

  const textarea = screen.getByPlaceholderText('Write something');

  await userEvent.type(textarea, 'Test input');

  expect(textarea).toBeInTheDocument();
  expect(handleChange).toBeCalled();
  expect(handleChange).toHaveBeenCalledTimes(10);
});

test('should update value on user input', async () => {
  render(<TextArea placeholder={'Type here...'} />);

  const textarea = screen.getByPlaceholderText('Type here...');
  await userEvent.type(textarea, 'Hello, world!');

  expect(textarea).toHaveValue('Hello, world!');
});

test('should render textarea with default value', () => {
  render(<TextArea defaultValue={'default value in textarea'} />);

  const textarea = screen.getByDisplayValue('default value in textarea');

  expect(textarea).toBeInTheDocument();
});
