import styled from "styled-components";
import { UserResponse } from "@chess/utils";
import { LinkButton } from "@chess/ui";
import { Leaderboard } from "@chess/features";
const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 1.5rem;
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
  const users: UserResponse[] = [
    {
      userName: "Skidragon",
      firstName: "Simon",
      lastName: "Davis",
      rating: 1000,
      email: "simon@gmail.com",
      id: 1,
    },
    {
      userName: "MrFinesse",
      firstName: "Kevin",
      lastName: "Mason",
      rating: 2000,
      email: "kevin@gmail.com",
      id: 2,
    },
  ];
  return (
    <StyledPage>
      <Hero>
        <Title>Chess</Title>
        <SubTitle>{`K&S Edition`}</SubTitle>
        <CTAButtonsGroup>
          <LinkButton variant={"primary"} href="/login">
            Login
          </LinkButton>
          <LinkButton variant={"secondary"} href="/signup">
            Signup
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
