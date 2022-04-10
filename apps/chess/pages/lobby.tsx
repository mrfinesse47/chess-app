import styled from "styled-components";

/* eslint-disable-next-line */
export interface LobbyProps {}

const StyledLobby = styled.div`
  color: pink;
`;

export function Lobby(props: LobbyProps) {
  return (
    <StyledLobby>
      <h1>Welcome to Lobby!</h1>
    </StyledLobby>
  );
}

export default Lobby;
