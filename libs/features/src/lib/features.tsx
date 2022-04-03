import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FeaturesProps {}

const StyledFeatures = styled.div`
  color: pink;
`;

export function Features(props: FeaturesProps) {
  return (
    <StyledFeatures>
      <h1>Welcome to Features!</h1>
    </StyledFeatures>
  );
}

export default Features;
