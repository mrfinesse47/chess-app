import styled from "styled-components";
import { Chess } from "chess.js";
/* eslint-disable-next-line */
export interface GameProps {}

const StyledGame = styled.div``;
const Board = styled.div`
  max-width: 80ch;
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
`;
const EmptyCell = styled.div`
  aspect-ratio: 1 / 1;
`;
const chess = new Chess();

const getCellBackground = (rowIndex: number, cellIndex: number) => {
  if (rowIndex % 2 === 0) {
    return cellIndex % 2 === 0 ? "beige" : "brown";
  }
  return cellIndex % 2 === 0 ? "brown" : "beige";
};

const getPieceColor = (color: "b" | "w") => {
  return color === "b" ? "black" : "white";
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
                      {cell.type}
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
