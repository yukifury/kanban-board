import {
  BasicCard,
  BasicColumn,
  MoveCardProps,
  MovementIndexes,
} from './board.model.ts';
import React from 'react';

export class BoardService {
  private readonly columns: BasicColumn[];
  private readonly setColumns: React.Dispatch<
    React.SetStateAction<BasicColumn[]>
  >;

  constructor(
    columns: BasicColumn[],
    setColumns: React.Dispatch<React.SetStateAction<BasicColumn[]>>,
  ) {
    this.columns = columns;
    this.setColumns = setColumns;
  }

  public createColumn = (column: BasicColumn) => {
    this.setColumns((prevState) => [...prevState, column]);
  };

  /**
   * Создание карточки и расположение её в конце колонки (children массива column)
   *
   * @param card
   * @param columnId
   */
  public createCard = (card: BasicCard, columnId: string) => {
    this.setColumns((prevState) => {
      return prevState.map((item) => {
        if (item.id !== columnId) {
          return item;
        }

        return { ...item, children: [...item.children, card] };
      });
    });
  };

  /**
   * Функция для перемещения карточки.
   *
   * Получая ID перетаскиваемой карточки, boolean-значение принадлежности "дропзоны" к карточке или колонки,
   * ID карточки (если isColumn: false) и ID конечной колонки функция "переносит" карточку путем
   * фильтра изначального массива column.children (удаление изначальной карточки) и добавлением через splice
   * нового элемента по индексу.
   *
   * @param {boolean} isColumnDropzone -
   * @param destinationColumnId
   * @param destinationCardId
   * @param sourceCardId
   */
  public moveCard = ({
    destinationCardId,
    destinationColumnId,
    sourceCardId,
  }: MoveCardProps) => {
    let movementIndexes: MovementIndexes = {} as MovementIndexes;

    if (destinationCardId !== undefined) {
      movementIndexes = this.getMovementIndexes({
        destinationCardId: destinationCardId,
        sourceCardId: sourceCardId,
      });
    } else {
      movementIndexes = this.getMovementIndexes({
        destinationColumnId,
        sourceCardId: sourceCardId,
      });
    }

    const currentTarget = this.columns[
      movementIndexes.sourceColumnIndex
    ].children.find((card) => card.id === sourceCardId);

    if (currentTarget === undefined) {
      throw new Error('Initial target is not defined');
    }

    this.setColumns((prevState) => {
      let newState = [...prevState];

      newState = newState.map((column, index) => {
        if (movementIndexes.sourceColumnIndex === index) {
          column.children = column.children.filter(
            (item) => item.id !== currentTarget.id,
          );
        }

        if (movementIndexes.destinationColumnIndex === index) {
          let newIndex = movementIndexes.destinationCardIndex;

          if (
            movementIndexes.destinationCardIndex >
              movementIndexes.sourceCardIndex &&
            movementIndexes.sourceColumn.id ===
              movementIndexes.destinationColumn?.id
          ) {
            newIndex--;
          }

          column.children.splice(newIndex, 0, currentTarget);
        }

        return column;
      });

      return newState;
    });
  };

  /**
   * Проверка является ли "дропзона" разрешенной для перетаскиваемой карточки.
   *
   * @param {string | undefined} destinationCardId - ID карточки к которой был выполнен перенос (если был выполнен в "дропзону" карточки)
   * @param {string | undefined} destinationColumnId - ID колонки куда был выполнен перенос (если был выполнен в "дропзону" колонки)
   * @param { string } sourceCardId - ID перетаскиваемой карточки
   */
  public isAllowedDropzone = ({
    destinationCardId,
    destinationColumnId,
    sourceCardId,
  }: MoveCardProps): boolean => {
    if (destinationCardId !== undefined) {
      const {
        destinationCardIndex,
        destinationColumnIndex,
        sourceCardIndex,
        sourceColumn,
        destinationColumn,
      } = this.getMovementIndexes({
        destinationCardId,
        sourceCardId,
      });

      // Проверка, что переносимая карточка в своей колонке не является единственной
      if (
        this.columns[destinationColumnIndex].children.length <= 1 &&
        sourceColumn.id === destinationColumn?.id
      ) {
        return false;
      }

      // Проверка, что переносимая карточка, конечная цель которой в изначальной колонке, не находится над (index - 1) целью
      return !(
        sourceCardIndex + 1 === destinationCardIndex &&
        sourceColumn.id === destinationColumn?.id
      );
    } else {
      const { sourceColumn, destinationColumn, sourceCardIndex } =
        this.getMovementIndexes({
          destinationColumnId,
          sourceCardId,
        });

      // Проверка, что перетягиваемая карточка не последняя в своей колонке
      if (
        destinationColumn.children.length - 1 === sourceCardIndex &&
        destinationColumn.id === sourceColumn.id
      ) {
        return false;
      }

      // Проверка, что конечная колонка переносимой карточки не является изначальной с 1 элементом
      return !(
        destinationColumn?.children.length === 1 &&
        destinationColumnId === sourceColumn.id
      );
    }
  };

  /**
   * Функция для поиска ID колонки по вложенной в неё ID карточке
   *
   * @param cardId
   */
  private findColumnByCardId = (cardId: string): BasicColumn => {
    let columnData: BasicColumn = {} as BasicColumn;

    this.columns.forEach((column) => {
      if (column.children.some((card) => card.id === cardId)) {
        return (columnData = column);
      }
    });

    return columnData;
  };

  /**
   * Функция поиска требуемых индексов по columns
   *
   * @param {string | undefined} destinationCardId - ID карточки на которую была "скинута" (onDrop) перетягиваемая карточка (sourceCard)
   * @param {string | undefined} destinationColumnId - ID колонки в которой находится окончательная карточка (destinationCard)
   * @param {string} sourceCardId - ID перетягиваемой карточки
   */
  private getMovementIndexes({
    destinationCardId,
    sourceCardId,
    destinationColumnId,
  }: MoveCardProps): MovementIndexes {
    if (destinationCardId !== undefined) {
      // Колонка, в которой находится перетягиваемая (source) карточка
      const sourceColumn = this.findColumnByCardId(sourceCardId);
      const destinationColumn = this.findColumnByCardId(destinationCardId);
      // Колонка, в которую нужно перенести карточку

      // Индекс колонки, в которой находится карточка, на которую была "скинута" (onDrop) перетягиваемая (source) карточка
      const destinationColumnIndex = this.columns.findIndex(
        (column) => column.id === destinationColumn.id,
      );
      // Индекс колонки, в которой находится перетягиваемая карточка
      const sourceColumnIndex = this.columns.findIndex(
        (column) => column.id === sourceColumn.id,
      );
      // Индекс перетягиваемой карточки
      const sourceCardIndex = this.columns[
        sourceColumnIndex
      ].children.findIndex((card) => card.id === sourceCardId);
      // Индекс "окончательной" карточки, на которую была "скинута" (onDrop) перетягиваемая (source) карточка
      const destinationCardIndex = this.columns[
        destinationColumnIndex
      ].children.findIndex((card) => card.id === destinationCardId);

      return {
        sourceColumn,
        destinationCardIndex,
        sourceCardIndex,
        destinationColumnIndex,
        sourceColumnIndex,
        destinationColumn,
      };
    } else {
      const sourceColumn = this.findColumnByCardId(sourceCardId);
      const destinationColumn = this.columns.find(
        (column) => column.id === destinationColumnId,
      );

      if (destinationColumn === undefined) {
        throw new Error('Destination column not found');
      }

      const destinationColumnIndex = this.columns.findIndex(
        (column) => column.id === destinationColumnId,
      );
      const sourceColumnIndex = this.columns.findIndex(
        (column) => column.id === sourceColumn.id,
      );
      // Индекс перетягиваемой карточки
      const sourceCardIndex = this.columns[
        sourceColumnIndex
      ].children.findIndex((card) => card.id === sourceCardId);
      const destinationCardIndex = destinationColumn.children.length;

      return {
        sourceColumn,
        destinationCardIndex,
        sourceCardIndex,
        destinationColumnIndex,
        sourceColumnIndex,
        destinationColumn,
      };
    }
  }

  public isColumnId = (id: string) => {
    return this.columns.some((column) => column.id === id);
  };
}
