import { fontStyle } from '@/styles/fontStyle';
import styled from 'styled-components';

interface Props {
  description: string;
}

function Basic({ description }: Props) {
  return (
    <StyledContainer>
      <StyledDescription>{description}</StyledDescription>;
    </StyledContainer>
  );
}

export default Basic;

const StyledContainer = styled.div`
  /* padding: 100px 160px; */
  white-space: nowrap;
`;

const StyledDescription = styled.h5`
  ${fontStyle(18, 500)}
  text-align: center
`;
