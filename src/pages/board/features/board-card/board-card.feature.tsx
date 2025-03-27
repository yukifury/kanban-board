import React, { useRef } from 'react';
import styles from './board-card.module.css';
import { BasicCard, useBoardContext } from '../../widget';
import { classNames } from '@vkontakte/vkjs';
import { useDragAndDrop } from '../../../../hooks/use-drag-and-drop';
import BackdropCard from '../backdrop-card/backdrop-card.feature.tsx';

export interface BoardCardProps {
  card: BasicCard;
}

export const BoardCard: React.FC<BoardCardProps> = ({ card }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { backdropHeight, draggedOverTargetId } = useBoardContext();

  const {
    isDragging,
    handleDrag,
    handleDragOver,
    handleDrop,
    handleDragStart,
    handleDragEnd,
    position,
    handleDragLeave,
  } = useDragAndDrop();

  return (
    <>
      {isDragging && (
        <BackdropCard
          onDragEnter={handleDragLeave}
          height={cardRef.current?.clientHeight}
        />
      )}

      {draggedOverTargetId === card.id && !isDragging && (
        <BackdropCard
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(e) => handleDrop(e)}
          height={backdropHeight ?? undefined}
        />
      )}

      <div
        ref={cardRef}
        draggable={'true'}
        onDragOver={(e) =>
          handleDragOver({
            event: e,
            destinationCardId: card.id,
            isColumn: false,
          })
        }
        onDragStart={(e) => handleDragStart({ event: e, cardRef, card })}
        onDrag={handleDrag}
        onDragEnd={(e) => handleDragEnd(e)}
        style={
          isDragging
            ? {
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
              }
            : {}
        }
        className={classNames(styles.board_card, isDragging && styles.dragging)}
      >
        <div className={styles.content}>
          <span
            style={{
              lineBreak: 'inherit',
              wordBreak: 'inherit',
              whiteSpace: 'pre-line',
            }}
          >
            {card.value.trim()}
          </span>
        </div>
      </div>
    </>
  );
};
