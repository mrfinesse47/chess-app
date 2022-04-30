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
      DRAW: () => ({}),
      START_GAME: () => ({}),
      PAUSE_GAME: () => ({}),
      END_GAME: () => ({}),
    },
  }
);
