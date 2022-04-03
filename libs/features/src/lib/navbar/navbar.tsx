import styled from "styled-components";

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: black;
  padding: 1em;
  color: white;
`;

export function Navbar(props: NavbarProps) {
  return (
    <StyledNavbar>
      <h1>Welcome to Navbar!</h1>
    </StyledNavbar>
  );
}

export default Navbar;
