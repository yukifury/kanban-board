import React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './text-area.module.css';

export const TextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, children, ...props }) => {
  return (
    <textarea className={classNames(className, styles.textarea)} {...props}>
      {children}
    </textarea>
  );
};
