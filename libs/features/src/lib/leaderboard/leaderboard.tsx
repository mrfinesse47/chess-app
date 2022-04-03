import styled from "styled-components";

/* eslint-disable-next-line */
export interface LeaderboardProps {}

const StyledLeaderboard = styled.div`
  color: pink;
`;

export function Leaderboard(props: LeaderboardProps) {
  return (
    <StyledLeaderboard>
      <h1>Welcome to Leaderboard!</h1>
    </StyledLeaderboard>
  );
}

export default Leaderboard;
