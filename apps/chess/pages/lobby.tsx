import styled from "styled-components";
import { PlayersAvailableList } from "@chess/features";
import { users } from "@chess/utils";
/* eslint-disable-next-line */
export interface LobbyProps {}

const StyledLobby = styled.div``;

export function Lobby(props: LobbyProps) {
  return (
    <StyledLobby>
      <h1>Lobby</h1>
      <PlayersAvailableList users={users} />
    </StyledLobby>
  );
}

export default Lobby;
