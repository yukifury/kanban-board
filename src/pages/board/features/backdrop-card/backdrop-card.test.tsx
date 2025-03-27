import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import BackdropCard from './backdrop-card.feature.tsx';
import '@testing-library/jest-dom';
import style from './backdrop-card.module.css';

test('render backdrop card with height and class', () => {
  render(
    <BackdropCard
      data-testid={'backdrop-card'}
      className={style.ghost_card}
      height={100}
    />,
  );

  const backdrop = screen.getByTestId('backdrop-card');

  expect(backdrop).toBeInTheDocument();
  expect(backdrop).toHaveClass(style.ghost_card);
  expect(backdrop).toHaveStyle({ height: '100px' });
});
