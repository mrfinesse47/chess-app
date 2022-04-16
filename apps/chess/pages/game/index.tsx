import styled from "styled-components";
import { Chess } from "chess.js";
import { PieceType, PieceColor } from "@chess/utils";
/* eslint-disable-next-line */
export interface GameProps {}

const StyledGame = styled.div``;
const Board = styled.div`
  max-width: 80ch;
  margin: 0 auto;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
`;
const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
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
                      {getPiece(cell.type)}
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
