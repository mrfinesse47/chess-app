import { createModel } from "xstate/lib/model";
import { ChessInstance } from "chess.js";
export const gameModel = createModel(
  {
    board: [] as ReturnType<ChessInstance["board"]>,
    white: {},
    black: {},
    activePlayer: {},
    activeCell: {} as Record<string, unknown>,
    moves: 0,
  },
  {
    events: {
      INITIALIZE_GAME: () => ({}),
      CHOOSE_PLAYER: () => ({}),
      CONTINUE: () => ({}),
      DRAW: () => ({}),
      WIN: () => ({}),
      PLAYER_SELECTS_PIECE: ({ cell }: { cell: Record<string, unknown> }) => ({
        cell,
      }),
      PLAYER_MOVES_PIECE: () => ({}),
      PLAYER_CANCEL_MOVE: () => ({}),
      VALID_MOVE: () => ({}),
      INVALID_MOVE: () => ({}),
      START_GAME: () => ({}),
      PAUSE_GAME: () => ({}),
      END_GAME: () => ({}),
    },
  }
);
