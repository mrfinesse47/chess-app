import styled from "styled-components";
import { User } from "@chess/utils";
import Link from "next/link";
const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 1.5rem;
`;
const LinkButton = styled(Link)`
  padding: 1em;
  background: orange;
`;

const Navbar = styled.nav``;
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
const Leaderboard = styled.div`
  background: yellow;
  padding: 1rem;
`;
const List = styled.ul``;
const Item = styled.li``;
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
          <LinkButton href="/login">Login</LinkButton>
          <LinkButton href="/register">Register</LinkButton>
        </CTAButtonsGroup>
        <StatsSection>
          <Leaderboard>
            <List>
              {users.map((user) => {
                return <Item key={user.name}>{user.name}</Item>;
              })}
            </List>
          </Leaderboard>
        </StatsSection>
      </Hero>
    </StyledPage>
  );
}

export default Index;
