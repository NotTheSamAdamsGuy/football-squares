import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { GameStatus } from "../lib/enums";
import { BoardState } from "../lib/interfaces";

type BoardStateObj = {
  boardState: BoardState;
  setBoardState: Dispatch<SetStateAction<BoardState>>;
};

export const Context = createContext<BoardStateObj>({} as BoardStateObj);

export const BoardStateContext = ({ children }: { children: ReactNode }) => {
  const savedState = JSON.parse(localStorage.getItem("boardState")!);
  const [boardState, setBoardState] = useState<BoardState>(
    savedState
      ? savedState
      : {
          gameStatus: GameStatus.NotStarted,
          displayHeaderNumbers: false,
          isConfigured: false,
        }
  );

  return (
    <Context.Provider value={{ boardState, setBoardState }}>
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBoardStateContext = () => useContext(Context);
