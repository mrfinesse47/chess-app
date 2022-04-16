import styled from "styled-components";
import { Chess } from "chess.js";
import { PieceType, PieceColor } from "@chess/utils";
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
    content: "1";
    position: absolute;
    top: 50%;
    left: -4ch;
    transform: translateY(-50%);
  }
  &::after {
    content: "1";
    position: absolute;
    top: 50%;
    right: -4ch;
    transform: translateY(-50%) rotate(180deg);
  }
  &:first-child > * {
    position: relative;
    &::before {
      content: "A";
      color: white;
      font-size: 1rem;
      position: absolute;
      top: -4ch;
    }
  }
  &:last-child > * {
    position: relative;
    &::after {
      font-size: 1rem;
      content: "A";
      position: absolute;
      bottom: -4ch;
    }
  }
`;
const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
`;
const Piece = styled.div`
  font-size: 3rem;
`;
const EmptyCell = styled.div`
  aspect-ratio: 1 / 1;
`;
const chess = new Chess();

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
export function Game(props: GameProps) {
  return (
    <StyledGame>
      <Board>
        {chess.board().map((row, rowIndex) => {
          return (
            <Row key={rowIndex}>
              {row.map((cell, cellIndex) => {
                if (cell) {
                  return (
                    <Cell
                      key={cellIndex}
                      style={{
                        color: getPieceColor(cell.color),
                        background: getCellBackground(rowIndex, cellIndex),
                      }}
                    >
                      <Piece>{getPiece(cell.type)}</Piece>
                    </Cell>
                  );
                }
                return (
                  <EmptyCell
                    key={cellIndex}
                    style={{
                      background: getCellBackground(rowIndex, cellIndex),
                    }}
                  />
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
