import { createMachine } from "xstate";

export const gameMachine = createMachine({
  id: "Chess Game",
  initial: "initialize game",
  states: {
    "initialize game": {
      description: "Start Timer, Setup pieces and grid",
      on: {
        GAME_INITIALIZED: {
          description: "Enable Players to make moves.",
          target: "choose player",
        },
      },
    },
    "choose player": {
      description: "Start Player Timer",
      on: {
        PLAYER_CHOSEN: {
          description: "Player's timer actor is active",
          target: "player move",
        },
      },
    },
    "player move": {
      initial: "idle",
      states: {
        idle: {
          on: {
            SELECT_PIECE: {
              target: "player selected piece",
            },
          },
        },
        "player selected piece": {
          description:
            "Piece is highlighted and possible movements indicators placed.",
          on: {
            CANCEL_MOVE: {
              target: "idle",
            },
            MOVES_PIECE: {
              target: "#Chess Game.Check Move",
            },
          },
        },
      },
    },
    "Check Move": {
      description: "Check with server if its a valid move",
      on: {
        VALID_MOVE: {
          target: "Check for Checkmate",
          actions: "checkMove",
        },
        INVALID_MOVE: {
          target: "player move",
        },
      },
    },
    "Check for Checkmate": {
      on: {
        CONTINUE: {
          target: "choose player",
        },
        DRAW: {
          target: "draw",
        },
        WIN: {
          target: "win",
        },
      },
    },
    draw: {},
    win: {},
  },
});
