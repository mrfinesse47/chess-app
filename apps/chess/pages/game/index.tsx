import styled from "styled-components";
import { Chess } from "chess.js";
import { PieceType, PieceColor } from "@chess/utils";
import { gameMachine } from "@chess/machines";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
/* eslint-disable-next-line */
export interface GameProps {}

const StyledGame = styled.div``;
const Board = styled.div`
  max-width: 80ch;
  margin: 0 auto;
  background: #323232;
  padding: 8ch;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
  position: relative;
  &::before {
    counter-reset: variable var(--number);
    content: counter(variable);
    position: absolute;
    top: 50%;
    left: -4ch;
    transform: translateY(-50%);
  }
  &::after {
    counter-reset: variable var(--number);
    content: counter(variable);
    position: absolute;
    top: 50%;
    right: -4ch;
    transform: translateY(-50%) rotate(180deg);
  }
`;
const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  position: relative;
  cursor: pointer;
  &::before {
    content: attr(data-top-letter);
    position: absolute;
    top: -4ch;
    color: white;
    transform: rotate(180deg);
  }
  &::after {
    content: attr(data-bottom-letter);
    position: absolute;
    bottom: -4ch;
    color: white;
  }
`;
const Piece = styled.div`
  font-size: 2.5rem;
  position: absolute;
`;

const getCellBackground = (rowIndex: number, cellIndex: number) => {
  if (rowIndex % 2 === 0) {
    return cellIndex % 2 === 0 ? "darksalmon" : "brown";
  }
  return cellIndex % 2 === 0 ? "brown" : "darksalmon";
};

const getPieceColor = (color: PieceColor) => {
  return color === "b" ? "black" : "white";
};
const getPiece = (type: PieceType) => {
  let piece: string;
  switch (type) {
    case "r":
      piece = "♜";
      break;
    case "n":
      piece = "♞";
      break;
    case "b":
      piece = "♝";
      break;
    case "k":
      piece = "♚";
      break;
    case "q":
      piece = "♛";
      break;
    case "p":
      piece = "♟";
  }
  return piece;
};
const isActiveCell = (cell, activeCell) => {
  const [letter, number] = cell.square;
  const [activeLetter, activeNumber] = activeCell.square;
  return letter === activeLetter && number === activeNumber;
};
const chess = new Chess();
const CHAR_CODE_A = 97;
export function Game(props: GameProps) {
  const board = chess.board();
  const [state, send] = useMachine(() => gameMachine);
  const { context } = state;
  useEffect(() => {
    send({
      type: "INITIALIZE_GAME",
    });
  }, [send]);
  return (
    <StyledGame>
      <Board>
        {board.map((row, rowIndex) => {
          const rowStyle = {
            "--number": board.length - rowIndex,
          } as React.CSSProperties;
          return (
            <Row style={rowStyle} key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const emptyCell = {
                  color: "white",
                  background: getCellBackground(rowIndex, cellIndex),
                  square: [
                    String.fromCharCode(CHAR_CODE_A + cellIndex),
                    board.length - rowIndex,
                  ],
                };
                const cellValue = cell ?? emptyCell;
                const [letter] = cellValue.square;
                return (
                  <Cell
                    key={cellIndex}
                    style={{
                      color: getPieceColor(cellValue.color),
                      background: getCellBackground(rowIndex, cellIndex),
                    }}
                    data-top-letter={rowIndex === 0 ? letter.toUpperCase() : ""}
                    data-bottom-letter={
                      rowIndex === 7 ? letter.toUpperCase() : ""
                    }
                  >
                    <Piece>{getPiece(cellValue.type)}</Piece>
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </Board>
    </StyledGame>
  );
}

export default Game;
