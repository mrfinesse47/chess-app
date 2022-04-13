import styled from "styled-components";
import { users } from "@chess/utils";
import { LinkButton } from "@chess/ui";
import { Leaderboard, useSession } from "@chess/features";
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
  const { hasUser } = useSession();

  return (
    <StyledPage>
      <Hero>
        <Title>Chess</Title>
        <SubTitle>{`K&S Edition`}</SubTitle>
        {hasUser ? (
          <LinkButton variant="primary" href="/lobby">
            Available
          </LinkButton>
        ) : (
          <CTAButtonsGroup>
            <LinkButton variant={"primary"} href="/login">
              Login
            </LinkButton>
            <LinkButton variant={"secondary"} href="/signup">
              Signup
            </LinkButton>
          </CTAButtonsGroup>
        )}
        <StatsSection>
          <Leaderboard users={users} />
        </StatsSection>
      </Hero>
    </StyledPage>
  );
}

export default Index;
