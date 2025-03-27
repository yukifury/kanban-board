/**
 * Интерфейс колонки
 *
 * name - название колонки
 * children - массив карточек
 * id - UUID
 */
export interface BasicColumn {
  children: BasicCard[];
  name: string;
  id: string;
}

/**
 * Интерфейс карточки
 *
 * value - текст карточки
 * id - UUID
 */
export interface BasicCard {
  value: string;
  id: string;
}

/**
 * Интерфейс используемый в функциях отвечающих за перемещение карточки
 * destinationCardId - конечная цель переноса (карточка)
 *
 * destinationColumnId - конечная цель переноса (колонка)
 *
 * sourceCardId - ID переносимой карточки
 */
export interface MoveCardProps {
  destinationCardId?: string;
  destinationColumnId?: string;
  sourceCardId: string;
}

/**
 * Интерфейс используемый в функции getMovementIndexes для получения всех индексов перемещения.
 *
 * sourceColumn - колонка из которой переносится карточка
 *
 * destinationCardIndex - индекс карточки к которой нужно переместить перетаскиваемую карточку
 *
 * sourceCardIndex - индекс перетаскиваемую карточки в её колонке, массиве children
 *
 * destinationColumnIndex - индекс колонки куда нужно перенести перетаскиваемую карточку
 */
export interface MovementIndexes {
  sourceColumn: BasicColumn;
  destinationCardIndex: number;
  sourceCardIndex: number;
  destinationColumnIndex: number;
  sourceColumnIndex: number;
  destinationColumn: BasicColumn;
}
