import React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { BoardCard } from '../board-card';
import styles from './board-column.module.css';
import { BoardCardCreate } from '../board-card-create';
import { BasicColumn } from '../../widget';
import { BoardColumnContext } from './board-column.context.ts';
import { useDragAndDrop } from '../../../../hooks/use-drag-and-drop';
import { useBoardContext } from '../../widget';
import BackdropCard from '../backdrop-card/backdrop-card.feature.tsx';

export interface BoardColumnProps {
  column: BasicColumn;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ column }) => {
  const { backdropHeight, draggedOverTargetId } = useBoardContext();
  const { handleDrop, handleDragOver } = useDragAndDrop();

  return (
    <BoardColumnContext value={{ columnId: column.id }}>
      <div className={classNames(styles.board_column)}>
        <h3 className={classNames(styles.board_column_name)}>{column.name}</h3>

        <ul className={styles.board_column_list}>
          {column.children?.map((card) => (
            <li key={card.id}>
              <BoardCard card={card} />
            </li>
          ))}
        </ul>

        {draggedOverTargetId === column.id && (
          <div
            style={{ marginInline: '12px' }}
            onDragOver={(e) => {
              handleDragOver({
                event: e,
                destinationColumnId: column.id,
                isColumn: true,
              });
            }}
            onDrop={(e) => handleDrop(e)}
          >
            <BackdropCard height={backdropHeight ?? undefined} />
          </div>
        )}

        <BoardCardCreate
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => {
            handleDragOver({
              event: e,
              destinationColumnId: column.id,
              isColumn: true,
            });
          }}
        />
      </div>
    </BoardColumnContext>
  );
};
