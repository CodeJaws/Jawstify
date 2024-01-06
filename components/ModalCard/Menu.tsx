import API from '@/apis/api';
import Modal from '@/components/Modal/Modal';
import useModalOpen from '@/hooks/DropDown/useModalOpen';
import useCardId from '@/hooks/ModalCard/useCardId';
import useCardOpen from '@/hooks/ModalCard/useCardOpen';
import useRefresh from '@/hooks/useRefresh';
import MenuImg from '@/public/assets/icons/MenuButton.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { styled } from 'styled-components';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isModalOpen, setIsModalOpen } = useModalOpen();
  const { cardId } = useCardId();
  const { isCardOpen, setIsCardOpen } = useCardOpen();
  const { refresh, setRefresh } = useRefresh();

  const router = useRouter();

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleUpdate = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  const updateCard = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (confirm('카드를 삭제 하시겠습니까?')) {
        await API.cards.deleteCard({ cardId });
        setRefresh(!refresh);
        setIsCardOpen(!isCardOpen);
      }
    } catch (error) {
      console.error;
    }
  };

  return (
    <>
      <StyledContainer onClick={openMenu} onBlur={closeMenu}>
        {isOpen && (
          <StyledMenu>
            <StyledButton onClick={handleUpdate}>수정하기</StyledButton>
            <StyledButton onClick={handleDelete}>삭제하기</StyledButton>
          </StyledMenu>
        )}
      </StyledContainer>
      {isModalOpen && <Modal title={'할 일 수정'} onOkClick={updateCard} onCancelClick={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Menu;

const StyledContainer = styled.button`
  position: relative;
  width: 28px;
  height: 28px;
  background-image: url(${MenuImg.src});
  background-position: center;

  ${onMobile} {
    width: 20px;
    height: 20px;
  }
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 8px;
  top: 28px;
  width: 93px;
  height: 82px;
  padding: 6px;
  border: 1px solid var(--input-border);
  border-radius: 6px;
  background-color: var(--content-color);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);

  ${onMobile} {
    width: 86px;
    height: 74px;
  }
`;

const StyledButton = styled.div`
  padding: 4px 16px;
  ${fontStyle(14, 400)};
  text-align: center;
  line-height: 24px;
  color: var(--button-color);

  &:hover {
    border-radius: 4px;
    color: ${COLORS.VIOLET_55};
    background: var(--button-hover);
  }

  ${onMobile} {
    font-size: 1.2rem;
    padding: 2px 16px;
  }
`;
