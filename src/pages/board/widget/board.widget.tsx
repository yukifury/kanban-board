import React, { useState } from 'react';
import { BoardColumn } from '../features/board-column';
import styles from './board-widget.module.css';
import { BoardContext } from './board.context.ts';
import { BasicColumn } from './board.model.ts';
import BoardColumnCreate from '../features/board-column-create/board-column-create.feature.tsx';
import { BoardService } from './board.service.ts';
import { dummyData } from './dummy-data.ts';

export const BoardWidget: React.FC = () => {
  const [columns, setColumns] = useState<BasicColumn[]>(dummyData);
  const [draggingTargetId, setDraggingTargetId] = useState<string | null>(null);
  const [backdropHeight, setBackdropHeight] = useState<number | null>(null);
  const [draggedOverTargetId, setDraggedOverTargetId] = useState<string | null>(
    null,
  );

  const service = new BoardService(columns, setColumns);

  return (
    <BoardContext.Provider
      value={{
        columns,
        createColumn: service.createColumn,
        createCard: service.createCard,
        moveCard: service.moveCard,
        isAllowedDropzone: service.isAllowedDropzone,
        isColumnId: service.isColumnId,
        setDraggingTargetId,
        draggingTargetId,
        backdropHeight,
        setBackdropHeight,
        draggedOverTargetId,
        setDraggedOverTargetId,
      }}
    >
      <div className={styles.boardWidget}>
        {columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}

        <BoardColumnCreate />
      </div>
    </BoardContext.Provider>
  );
};
