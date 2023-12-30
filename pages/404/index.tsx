import Image from 'next/image';
import emoji from '@/public/assets/images/emoji.webp';
import { styled } from 'styled-components';
import { fontStyle } from '@/styles/fontStyle';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import { COLORS } from '@/styles/palettes';

function NotFound() {
  return (
    <StyledContainer>
      <Styled404Text>404</Styled404Text>
      <Styled404Image width={200} height={200} src={emoji} alt="crying emoji"></Styled404Image>
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
