import React, { PropsWithChildren } from 'react';
import styles from './main-layout.module.css';
import { classNames } from '@vkontakte/vkjs';

/**
 * Основной лейаут приложения
 *
 * @param children
 * @constructor
 */
export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className={classNames(styles.main_layout)}>{children}</main>;
};
