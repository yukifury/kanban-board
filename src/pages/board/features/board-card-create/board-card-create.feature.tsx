import React, { useState } from 'react';
import styles from './board-card-create.module.css';
import { Button } from '../../../../components/button';
import { TextArea } from '../../../../components/text-area';
import { BasicCard } from '../../widget';
import { useBoardContext } from '../../widget';
import { useColumnContext } from '../board-column';
import XIcon from '../../../../components/icons/x/x-icon.tsx';
import PlusIcon from '../../../../components/icons/plus/plus-icon.tsx';

export const BoardCardCreate: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ ...props }) => {
  const { createCard } = useBoardContext();
  const { columnId } = useColumnContext();
  const [isCardCreating, setIsCardCreating] = useState<boolean>(false);
  const [bodyValue, setBodyValue] = useState<string>('');

  const handleClick = () => {
    setIsCardCreating((prevState) => !prevState);
  };

  const handleCreate = () => {
    if (bodyValue.trim() === '') {
      return;
    }

    const newCard: BasicCard = {
      value: bodyValue,
      id: crypto.randomUUID(),
    };

    createCard(newCard, columnId);
    setIsCardCreating(false);
    setBodyValue('');
  };

  if (isCardCreating) {
    return (
      <div {...props} className={styles.board_column_card_creation}>
        <div className={styles.board_column_textarea}>
          <div style={{ paddingInline: '12px' }}>
            <TextArea
              onChange={(e) => setBodyValue(e.target.value)}
              placeholder={'Введите название карточки'}
              style={{ width: '100%' }}
              autoFocus
            />
          </div>
        </div>

        <div
          style={{
            paddingInline: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button onClick={handleCreate}>Добавить карточку</Button>

          <XIcon onClick={handleClick} />
        </div>
      </div>
    );
  }

  return (
    <div
      {...props}
      onClick={handleClick}
      className={styles.board_column_card_create}
    >
      <div>
        <PlusIcon />

        <span>Добавить еще одну карточку</span>
      </div>
    </div>
  );
};
