import { createModel } from "xstate/lib/model";

export const gameModel = createModel(
  {
    board: [],
    player1: {},
    player2: {},
    activePlayer: {},
    moves: 0,
  },
  {
    events: {
      INITIALIZE_GAME: () => ({}),
      CHOOSE_PLAYER: () => ({}),
      CONTINUE: () => ({}),
      DRAW: () => ({}),
      WIN: () => ({}),
      PLAYER_SELECTS_PIECE: () => ({}),
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
