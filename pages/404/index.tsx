import Button from '@/components/common/Button/Button';
import DefaultImg from '@/public/assets/images/jaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from 'styled-components';

function NotFound() {
  return (
    <StyledContainer>
      <Styled404Text>404</Styled404Text>
      <Styled404Image width={200} height={200} src={DefaultImg} alt="crying emoji" />
      <StyledText>OOPS! PAGE NOT BE FOUND</StyledText>
      <Link href="/">
        <Button text="Back to Home" size="large" onClick={() => {}}></Button>
      </Link>
    </StyledContainer>
  );
}

export default NotFound;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.VIOLET_15};
`;

const Styled404Image = styled(Image)`
  position: absolute;
  margin-bottom: 120px;
`;

const Styled404Text = styled.h1`
  ${fontStyle(250, 800)}
`;

const StyledText = styled.h1`
  ${fontStyle(40, 600)}
  margin-bottom: 30px;
`;
