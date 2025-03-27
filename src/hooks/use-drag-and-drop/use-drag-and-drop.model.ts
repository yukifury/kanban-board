import React from 'react';
import { BasicCard } from '../../pages/board/widget';

export interface HandleDragOverProps {
  event: React.DragEvent<HTMLDivElement>;
  destinationCardId?: string;
  destinationColumnId?: string;
  isColumn: boolean;
}

export interface HandleDragStartProps {
  event: React.DragEvent<HTMLDivElement>;
  cardRef: React.RefObject<HTMLDivElement | null>;
  card: BasicCard;
}

export interface UseDragAndDropProps {
  position: { x: number; y: number };
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: ({ event, cardRef, card }: HandleDragStartProps) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  draggedOverTargetId: string | null;
  handleDragOver: ({
    event,
    destinationColumnId,
    isColumn,
    destinationCardId,
  }: HandleDragOverProps) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}
