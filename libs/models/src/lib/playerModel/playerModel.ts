import { createModel } from "xstate/lib/model";

export const playerModel = createModel(
  {
    username: "",
    isActive: false,
    assignedColor: "",
    timeLeft: 0,
  },
  {
    events: {
      SELECT_PIECE: () => ({}),
      MOVE_PIECE: () => ({}),
      CANCEL_MOVE: () => ({}),
      UNDO: () => ({}),
      REDO: () => ({}),
      CALL_FOR_DRAW: () => ({}),
      LEAVE_GAME: () => ({}),
      SURRENDER: () => ({}),
    },
  }
);
