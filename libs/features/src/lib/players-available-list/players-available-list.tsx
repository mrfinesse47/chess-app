import { UserResponse } from "@chess/utils";
import styled from "styled-components";

/* eslint-disable-next-line */
export interface PlayersAvailableListProps {
  users: UserResponse[];
}

const StyledPlayersAvailableList = styled.div`
  background: #fbd7ac;
  padding: 1em;
  color: black;
`;

const List = styled.ul`
  display: flex;
  flex-flow: column;
`;
const Item = styled.li``;
const Name = styled.div``;
const Rating = styled.div``;
const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 1em;
  background: white;
`;
const InfoContainer = styled.div`
  display: flex;
`;
const Input = styled.input``;
export function PlayersAvailableList({
  users,
  ...props
}: PlayersAvailableListProps) {
  return (
    <StyledPlayersAvailableList {...props}>
      <h2>Players Available</h2>
      <List>
        {users.map((user) => {
          return (
            <Item key={user.id}>
              <Label>
                <Input type="checkbox" id={user.userName} />
                <InfoContainer>
                  <Name>{user.userName}</Name>
                  <Rating>{user.rating}</Rating>
                </InfoContainer>
              </Label>
            </Item>
          );
        })}
      </List>
    </StyledPlayersAvailableList>
  );
}

export default PlayersAvailableList;
