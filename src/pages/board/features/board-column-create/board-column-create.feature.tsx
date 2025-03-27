import styles from './board-column-create.module.css';
import { TextArea } from '../../../../components/text-area';
import { Button } from '../../../../components/button';
import { useState } from 'react';
import { BasicColumn } from '../../widget';
import { useBoardContext } from '../../widget';
import XIcon from '../../../../components/icons/x/x-icon.tsx';
import PlusIcon from '../../../../components/icons/plus/plus-icon.tsx';

const BoardColumnCreate = () => {
  const { createColumn } = useBoardContext();
  const [isColumnCreating, setIsColumnCreating] = useState(false);
  const [nameValue, setNameValue] = useState<string>('');

  const handleClick = () => {
    setIsColumnCreating((prevState) => !prevState);
  };

  const handleCreate = () => {
    if (nameValue === '') {
      return;
    }

    const newColumn: BasicColumn = {
      name: nameValue,
      id: crypto.randomUUID(),
      children: [],
    };

    createColumn(newColumn);

    setNameValue('');
    setIsColumnCreating(false);
  };

  if (isColumnCreating) {
    return (
      <div className={styles.board_column_creation}>
        <div className={styles.board_column_textarea}>
          <div>
            <TextArea
              onChange={(e) => setNameValue(e.target.value)}
              placeholder={'Введите название колонки'}
              style={{ width: '100%' }}
              autoFocus
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button onClick={handleCreate}>Добавить колонку</Button>

          <XIcon onClick={handleClick} />
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleClick} className={styles.board_column_create}>
      <div>
        <PlusIcon />

        <span>Добавить еще одну колонку</span>
      </div>
    </div>
  );
};

export default BoardColumnCreate;
