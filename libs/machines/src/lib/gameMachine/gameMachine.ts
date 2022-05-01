import { gameModel } from "@chess/models";
import { Chess } from "chess.js";
const chess = new Chess();

export const gameMachine = gameModel.createMachine({
  id: "Chess Game",
  initial: "initialize game",
  context: {
    board: [],
    white: {},
    black: {},
    activePlayer: {},
    activeCell: {},
    moves: 0,
  },
  states: {
    "initialize game": {
      description: "Start Timer, Setup pieces and grid",
      on: {
        INITIALIZE_GAME: {
          actions: gameModel.assign({
            board: chess.board(),
          }),
          description: "Enable Players to make moves.",
          target: "choose player",
        },
      },
    },
    "choose player": {
      description: "Start Player Timer",
      always: {
        actions: gameModel.assign({
          activePlayer: (ctx) => {
            return ctx.white;
          },
        }),
        description: "Player's timer actor is active",
        target: "player phase",
      },
    },
    "player phase": {
      initial: "idle",
      states: {
        idle: {
          on: {
            PLAYER_SELECTS_PIECE: {
              actions: gameModel.assign({
                activeCell: (_, event) => {
                  return event.cell;
                },
              }),
              target: "player selected piece",
            },
          },
        },
        "player selected piece": {
          description:
            "Piece is highlighted and possible movements indicators placed.",
          on: {
            PLAYER_CANCEL_MOVE: {
              target: "idle",
            },
            PLAYER_MOVES_PIECE: {
              target: "#Chess Game.check move",
            },
          },
        },
      },
    },
    "check move": {
      description: "Check with server if its a valid move",
      on: {
        VALID_MOVE: {
          target: "Check for Checkmate",
          actions: "checkMove",
        },
        INVALID_MOVE: {
          target: "player phase",
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
