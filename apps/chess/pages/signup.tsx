import styled from "styled-components";

/* eslint-disable-next-line */
export interface SignupProps {}

const StyledSignup = styled.div`
  color: pink;
`;

export function Signup(props: SignupProps) {
  return (
    <StyledSignup>
      <h1>Signup</h1>
    </StyledSignup>
  );
}

export default Signup;
