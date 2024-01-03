import useCardOpen from '@/hooks/ModalCard/useCardOpen';
import Close from '@/public/assets/icons/Close.svg';
import { onMobile } from '@/styles/mediaQuery';
import { styled } from 'styled-components';
import Menu from './Menu';

function ModalButton() {
  const { setIsCardOpen } = useCardOpen();
  return (
    <StyledContainer>
      <Menu />
      <StyledClose onClick={() => setIsCardOpen(false)} />
    </StyledContainer>
  );
}

export default ModalButton;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
`;

const StyledClose = styled.button`
  width: 28px;
  height: 28px;
  background-image: url(${Close.src});
  background-position: center;

  ${onMobile} {
    width: 24px;
    height: 24px;
  }
`;
