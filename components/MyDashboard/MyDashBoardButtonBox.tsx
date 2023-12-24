import { onMobile, onTablet } from '@/styles/mediaQuery';
import styled from 'styled-components';

function MyDashBoardButtonBox() {
  return (
    <ButtonBoxContainer>
      <p>예예예</p>
    </ButtonBoxContainer>
  );
}

export default MyDashBoardButtonBox;

const ButtonBoxContainer = styled.div`
  width: 1023px;
  height: 210px;
  ${onTablet} {
    width: 100%;
    height: 280px;
  }
  ${onMobile} {
    width: 100%;
    height: 435px;
  }
`;
