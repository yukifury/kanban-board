import React, { useContext } from 'react';

export interface BoardColumnContextProps {
  columnId: string;
}

export const BoardColumnContext = React.createContext<BoardColumnContextProps>(
  {} as BoardColumnContextProps,
);

export const useColumnContext = () => useContext(BoardColumnContext);
