import { UserResponse } from "@chess/utils";
import styled from "styled-components";
import React from "react";
/* eslint-disable-next-line */
export interface LeaderboardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  users: UserResponse[];
}

const StyledLeaderboard = styled.div`
  background: yellow;
  padding: 1rem;
`;
const List = styled.ul``;
const Item = styled.li``;
export const Leaderboard = React.forwardRef<HTMLDivElement, LeaderboardProps>(
  ({ users, ...props }: LeaderboardProps, ref) => {
    return (
      <StyledLeaderboard {...props} ref={ref}>
        <h3>Leaderboard</h3>
        <List>
          {users.map((user) => {
            return <Item key={user.userName}>{user.userName}</Item>;
          })}
        </List>
      </StyledLeaderboard>
    );
  }
);

export default Leaderboard;
