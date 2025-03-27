import React, { useState } from 'react';
import { useBoardContext } from '../../pages/board/widget';
import {
  HandleDragOverProps,
  HandleDragStartProps,
  UseDragAndDropProps,
} from './use-drag-and-drop.model.ts';
import { NavigatorUtils } from '../../utils/navigator.utils.ts';

/**
 * Хук для доступа к Drag And Drop эвентам и функциям.
 *
 * Управляет поведением backdrop-эффекта, "перетягиванием" карточек, позиционированием перетягиваемой карточки.
 */
export const useDragAndDrop = (): UseDragAndDropProps => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const {
    moveCard,
    setBackdropHeight,
    isAllowedDropzone,
    draggingTargetId,
    setDraggingTargetId,
    setDraggedOverTargetId,
    draggedOverTargetId,
    isColumnId,
  } = useBoardContext();

  const handleDragLeave = () => {
    setDraggedOverTargetId(null);
  };

  /**
   * Функция для onDragStart.
   *
   * Добавляет данные перетягиваемой карточки в верхние (useBoardContext) state-переменные
   * и регулирует изначальный оффсет для позиционирования перетягиваемой карточки под курсором.
   * @param e - HTML drag-эвент
   * @param cardRef - ref-объект перетягиваемой карточки
   * @param card - BasicCard объект перетягиваемой карточки
   */
  const handleDragStart = ({ event, card, cardRef }: HandleDragStartProps) => {
    setDraggingTargetId(card.id);
    // Установка высоты backdrop-эффекта для его рендера в дальнейшем в "дропзонах"
    setBackdropHeight(cardRef.current?.clientHeight ?? null);

    if (cardRef.current) {
      // Для получения данных о расположении объекта относительно страницы
      const clientRect = cardRef.current.getBoundingClientRect();

      setDragOffset({
        x: event.clientX - clientRect.left,
        y: event.clientY - clientRect.top,
      });
    }

    event.dataTransfer.setData('text/plain', 'dummy');

    // Удаление нативной "картинки" при drag-эффекте в браузере (вариант с "прозрачной" base64 картинкой из-за ограничений Safari).
    // Из-за особенностей Firefox там будет отрабатывать нативная "ghost-картинка"
    if (!NavigatorUtils.isFirefox()) {
      const transparentImage = new Image();

      transparentImage.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

      event.dataTransfer.setDragImage(transparentImage, 0, 0);
    }
  };

  /**
   * Функция для onDrag
   *
   * Срабатывает в течении перетягивания карточки. Обновляет позиционирование карточки на странице для эффекта "перетягивания"
   *
   * @param event
   */
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.clientX === 0 && event.clientY === 0) return;

    setIsDragging(true);

    setPosition({
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y,
    });
  };

  /**
   * Функция для onDragEnd
   *
   * Срабатывает при "отпускании" карточки. Если карточка находится в "дропзоне", то произойдет её перенос на новое место
   */
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggingTargetId(null);
    setDraggedOverTargetId(null);

    if (draggedOverTargetId && draggingTargetId) {
      if (!isColumnId(draggedOverTargetId)) {
        moveCard({
          sourceCardId: draggingTargetId,
          destinationCardId: draggedOverTargetId,
        });
      } else {
        moveCard({
          sourceCardId: draggingTargetId,
          destinationColumnId: draggedOverTargetId,
        });
      }
    }
  };

  /**
   * Функция для onDrop, дропзона
   *
   * Срабатывает при "отпускании" перетягиваемой карточки на "дропзоне" и переносит карточку (если возможно) на новое место
   *
   * @param event
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!draggedOverTargetId || !draggingTargetId) {
      throw new Error(
        'DestinationCard or SourceCard is not defined in onDrop event',
      );
    }

    setDraggedOverTargetId(null);

    if (!isColumnId(draggedOverTargetId)) {
      moveCard({
        sourceCardId: draggingTargetId,
        destinationCardId: draggedOverTargetId,
      });
    } else {
      moveCard({
        sourceCardId: draggingTargetId,
        destinationColumnId: draggedOverTargetId,
      });
    }
  };

  /**
   * Функция для onDragOver
   *
   * При наведении перетягиваемой карточки на компоненты с этим хендлером заносит данные о "дропзоне" в верхнеуровневые state-переменные
   * в случае если это возможно (проверка по isAllowedDropzone)
   *
   * @param event
   * @param destinationColumnId
   * @param destinationCardId
   */
  const handleDragOver = ({
    event,
    destinationColumnId,
    destinationCardId,
  }: HandleDragOverProps) => {
    event.preventDefault();

    if (destinationCardId !== undefined) {
      if (
        isAllowedDropzone({
          sourceCardId: draggingTargetId ?? '',
          destinationCardId,
        })
      ) {
        setDraggedOverTargetId(destinationCardId);
      }
    } else {
      if (
        isAllowedDropzone({
          sourceCardId: draggingTargetId ?? '',
          destinationColumnId,
        })
      ) {
        setDraggedOverTargetId(destinationColumnId ?? '');
      }
    }
  };

  return {
    position,
    isDragging,
    dragOffset,
    handleDrag,
    handleDragEnd,
    handleDragStart,
    handleDrop,
    draggedOverTargetId,
    handleDragOver,
    handleDragLeave,
  };
};
