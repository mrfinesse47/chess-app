import styled from "styled-components";

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  color: pink;
`;

export function Navbar(props: NavbarProps) {
  return (
    <StyledNavbar>
      <h1>Welcome to Navbar!</h1>
    </StyledNavbar>
  );
}

export default Navbar;
