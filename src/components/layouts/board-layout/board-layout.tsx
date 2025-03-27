import { PropsWithChildren } from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './board-layout.module.css';

export const BoardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={classNames(styles.board_layout)}>{children}</div>;
};
