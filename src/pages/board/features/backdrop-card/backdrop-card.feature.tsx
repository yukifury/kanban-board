import React from 'react';
import styles from './backdrop-card.module.css';

export interface BackdropCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  height: number | undefined;
}

const BackdropCard: React.FC<BackdropCardProps> = ({ height, ...props }) => {
  return (
    <div
      {...props}
      data-testid="backdrop-card"
      className={styles.ghost_card}
      style={{
        height: height,
      }}
    ></div>
  );
};

export default BackdropCard;
