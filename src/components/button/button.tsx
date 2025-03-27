import React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './button.module.css';

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  return (
    <button className={classNames(className, styles.button)} {...props}>
      {children}
    </button>
  );
};
