import { COLORS } from '@/styles/palettes';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { fontStyle } from '@/styles/fontStyle';
import Basic from './ModalContent/Basic';

interface Props {
  content: null | '새로운 대시보드' | '할 일 생성' | '할 일 수정' | '새 칼럼 생성' | '컬럼 관리' | '초대하기';
  description?: string;
  handleOKClick: () => void;
  handleCancelClick: () => void;
}

function Modal({ content, description = '', handleOKClick, handleCancelClick }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const portalDiv = document.querySelector('#modal');

  if (!portalDiv) return null;

  return ReactDOM.createPortal(
    <>
      <StyledModalBackdrop onClick={handleCancelClick} />
      <StyledModalContainer>
        <StyledTitle>{content}</StyledTitle>
        {/* modal content 넣기 */}
        {content === null && <Basic description={description} />}
        <StyledButtonContainer>
          <button onClick={handleCancelClick}>취소</button>
          <button onClick={handleOKClick}>확인</button>
        </StyledButtonContainer>
      </StyledModalContainer>
    </>,
    portalDiv,
  );
}
//
export default Modal;

const StyledModalBackdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 10;
`;

const StyledModalContainer = styled.div`
  /* width: fit-content; */
  width: 540px;
  min-height: 250px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: ${COLORS.WHITE_FF};
  border-radius: 10px;
  box-shadow: 0 2pc 12px 0px rgba(0, 0, 0, 0.08);
  padding: 35px 30px 30px;
  gap: 24px;
`;
// const StyledMainText = styled.h4`
//   ${FONT_STYLE.BODY01_MEDIUM};
//   color: ${COLORS.TEXT_MAIN};
// `;

// const StyledDescriptionText = styled.h4`
//   ${FONT_STYLE.BODY02_MEDIUM}
//   color: ${COLORS.TEXT_MAIN}
// `;

// const StyledLine = styled.div`
//   width: 25.6rem;
//   height: 0.1rem;
//   background: ${COLORS.GREY5};
//`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`;

const StyledTitle = styled.h3`
  ${fontStyle(24, 700)}
`;
