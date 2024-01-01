import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ModalCommonProps } from '@/types/modal';
import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import Basic from './ModalContent/Basic';
import CreateDashboard from './ModalContent/CreateDashboard';
import CreateToDo from './ModalContent/CreateToDo';
import ManageColumn from './ModalContent/ManageColumn';
import NoTitle from './ModalContent/NoTitle';
import { INIT_BASIC, INIT_EDIT_TODO, INIT_MANAGE_COLUMN } from '@/constants/InitialModalValues';

interface Props extends ModalCommonProps {
  title: '' | '새로운 대시보드' | '할 일 생성' | '할 일 수정' | '새 컬럼 생성' | '컬럼 관리' | '초대하기';
  description?: string;
  isSingleButton?: boolean;
  defaultValue?: typeof INIT_EDIT_TODO | typeof INIT_MANAGE_COLUMN | typeof INIT_BASIC;
  onDeleteClick?: () => void;
}

function Modal({
  title,
  description = '',
  isSingleButton = false,
  defaultValue,
  onOkClick,
  onCancelClick,
  onDeleteClick = () => {},
  getValue = () => {},
}: Props) {
  const [value, setValue] = useState({});

  const isTightVersion = title == '할 일 생성' || title === '할 일 수정';

  const setModalInputValue = (values = {}) => {
    setValue(values); // value = modal에 입력된 input value들의 집합
  };

  getValue(value);

  const renderModalContent = (title: Props['title']) => {
    switch (title) {
      case '':
        return (
          <NoTitle
            description={description}
            isSingleButton={isSingleButton}
            onCancelClick={onCancelClick}
            onOkClick={onOkClick}
          />
        );
      case '새로운 대시보드':
        return <CreateDashboard onOkClick={onOkClick} onCancelClick={onCancelClick} getValue={setModalInputValue} />;
      case '할 일 생성':
        return <CreateToDo onOkClick={onOkClick} onCancelClick={onCancelClick} getValue={setModalInputValue} />;
      case '할 일 수정':
        return; // <EditToDo onOkClick={onOkClick} onCancelClick={onCancelClick} getValue={setModalInputValue} />;
      case '컬럼 관리':
        return (
          <ManageColumn
            onOkClick={onOkClick}
            onCancelClick={onCancelClick}
            onDeleteClick={onDeleteClick}
            getValue={setModalInputValue}
            defaultValue={defaultValue as typeof INIT_MANAGE_COLUMN}
          />
        );
      default:
        return <Basic type={title} onOkClick={onOkClick} onCancelClick={onCancelClick} getValue={setModalInputValue} />;
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
      <StyledModalContainer $isTightVersion={isTightVersion}>
        <StyledTitle>{title}</StyledTitle>
        {renderModalContent(title)}
      </StyledModalContainer>
    </>,
    portalDiv,
  );
}

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

const StyledModalContainer = styled.div<{ $isTightVersion: boolean }>`
  width: ${({ $isTightVersion }) => ($isTightVersion ? '506px' : '540px')};
  min-height: 240px;
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
    gap: 25px;
  }
`;

const StyledTitle = styled.h3`
  ${fontStyle(24, 700)}
  ${onMobile} {
    ${fontStyle(20, 700)}
  }
`;
