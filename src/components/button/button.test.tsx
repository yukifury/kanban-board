import '@testing-library/jest-dom';
import { expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button.tsx';
import styles from './button.module.css';

test('render button with children, classNames and handles click', () => {
  const handleClick = vi.fn();

  render(
    <Button className={styles.button} onClick={handleClick}>
      Click me
    </Button>,
  );

  const button = screen.getByRole('button');

  fireEvent.click(button);

  expect(button).toHaveClass(styles.button);
  expect(button).toBeInTheDocument();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('handles 1000 clicks', async () => {
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  const button = screen.getByRole('button');

  for (let i = 0; i < 1000; i++) {
    fireEvent.click(button);
  }

  expect(handleClick).toBeCalledTimes(1000);
});
