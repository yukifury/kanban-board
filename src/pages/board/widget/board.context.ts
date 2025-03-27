import React, { useContext } from 'react';
import { BasicCard, BasicColumn, MoveCardProps } from './board.model.ts';

export interface BoardContextProps {
  columns: BasicColumn[];
  createColumn: (column: BasicColumn) => void;
  createCard: (card: BasicCard, columnId: string) => void;
  moveCard: ({ destinationCardId, sourceCardId }: MoveCardProps) => void;
  draggingTargetId: string | null;
  setDraggingTargetId: (id: string | null) => void;
  draggedOverTargetId: string | null;
  setDraggedOverTargetId: (id: string | null) => void;
  backdropHeight: number | null;
  setBackdropHeight: (id: number | null) => void;
  isColumnId: (id: string) => boolean;
  isAllowedDropzone: ({
    destinationColumnId,
    destinationCardId,
    sourceCardId,
  }: MoveCardProps) => boolean;
}

export const BoardContext = React.createContext<BoardContextProps>(
  {} as BoardContextProps,
);

export const useBoardContext = () => useContext(BoardContext);
