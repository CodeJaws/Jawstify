import { COLORS } from '@/styles/palettes';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { fontStyle } from '@/styles/fontStyle';
import Basic from './ModalContent/Basic';
import CreateDashboard from './ModalContent/CreateDashboard';
import CreateToDo from './ModalContent/CreateToDo';
import EditToDo from './ModalContent/EditToDo';
import CreateColumn from './ModalContent/CreateColumn';
import ManageColumn from './ModalContent/ManageColumn';
import Invite from './ModalContent/Invite';
import TwinButton from '../common/Button/TwinButton';
import { onMobile } from '@/styles/mediaQuery';

interface Props {
  title: null | '새로운 대시보드' | '할 일 생성' | '할 일 수정' | '새 칼럼 생성' | '컬럼 관리' | '초대하기';
  description?: string;
  onOkClick?: () => void;
  onCancelClick?: () => void;
  onDeleteClick?: () => void;
}

function Modal({
  title,
  description = '',
  onOkClick = () => {},
  onCancelClick = () => {},
  onDeleteClick = () => {},
}: Props) {
  const renderModalContent = (title: Props['title']) => {
    switch (title) {
      case null:
        return <Basic description={description} />;
      case '새로운 대시보드':
        return <CreateDashboard></CreateDashboard>;
      case '할 일 생성':
        return <CreateToDo></CreateToDo>;
      case '할 일 수정':
        return <EditToDo></EditToDo>;
      case '새 칼럼 생성':
        return <CreateColumn onOkClick={onOkClick} onCancelClick={onCancelClick} />;
      case '컬럼 관리':
        return <ManageColumn onOkClick={onOkClick} onCancelClick={onCancelClick} onDeleteClick={onDeleteClick} />;
      case '초대하기':
        return <Invite />;
      default:
        throw Error;
    }
  };

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
      <StyledModalBackdrop onClick={onCancelClick} />
      <StyledModalContainer>
        <StyledTitle>{title}</StyledTitle>
        {/* modal content */}
        {renderModalContent(title)}
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
  padding: 32px 28px;
  gap: 28px;

  ${onMobile} {
    width: 330px;
    padding: 28px 23px 28px;
    gap: 28px;
  }
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
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;

  ${onMobile} {
    justify-content: center;
  }
`;

const StyledTitle = styled.h3`
  ${fontStyle(24, 700)}
  ${onMobile} {
    ${fontStyle(20, 700)}
  }
`;

const StyledTwinButton = styled(TwinButton)`
  & > button {
    border-radius: 8px;
  }
`;
