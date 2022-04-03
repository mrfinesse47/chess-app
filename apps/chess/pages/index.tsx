import styled from "styled-components";
import { User } from "@chess/utils";
import { LinkButton } from "@chess/ui";
import { Leaderboard, Navbar } from "@chess/features";
const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 1.5rem;
  background: #cecece;
`;

const Title = styled.h1`
  font-size: 4rem;
`;
const SubTitle = styled.h2`
  font-size: 1.5rem;
`;
const Hero = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
`;
const CTAButtonsGroup = styled.div`
  display: flex;
  & > * + * {
    margin-left: 1rem;
  }
`;
const StatsSection = styled.section``;

export function Index() {
  const users: User[] = [
    {
      name: "Simon",
      phone: 24242424,
    },
    {
      name: "Kevin",
      phone: 11111111,
    },
  ];
  return (
    <StyledPage>
      <Navbar />
      <Hero>
        <Title>Chess</Title>
        <SubTitle>{`K&S Edition`}</SubTitle>
        <CTAButtonsGroup>
          <LinkButton variant={"primary"} href="/login">
            Login
          </LinkButton>
          <LinkButton variant={"secondary"} href="/register">
            Register
          </LinkButton>
        </CTAButtonsGroup>
        <StatsSection>
          <Leaderboard users={users} />
        </StatsSection>
      </Hero>
    </StyledPage>
  );
}

export default Index;
