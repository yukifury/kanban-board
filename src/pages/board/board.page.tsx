import React from 'react';
import { BoardLayout } from '../../components/layouts/board-layout';
import { BoardWidget } from './widget';

export const BoardPage: React.FC = () => {
  return (
    <BoardLayout>
      <BoardWidget />
    </BoardLayout>
  );
};
