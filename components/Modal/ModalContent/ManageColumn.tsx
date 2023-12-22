import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TwinButton from '@/components/common/Button/TwinButton';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import styled from 'styled-components';

interface Props {
  onOkClick: () => void;
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

function ManageColumn({ onOkClick, onCancelClick, onDeleteClick = () => {} }: Props) {
  return (
    <>
      <StyledContainer>
        <BasicInput label="이름"></BasicInput>
      </StyledContainer>
      <StyledButtonContainer>
        <StyledDeleteButton onClick={onDeleteClick}>삭제하기</StyledDeleteButton>
        <StyledTwinButton
          text1="취소"
          text2="변경"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={onOkClick}
        ></StyledTwinButton>
      </StyledButtonContainer>
    </>
  );
}

export default ManageColumn;

const StyledContainer = styled.div`
  /* padding: 100px 160px; */
  white-space: nowrap;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2.4rem;

  ${onMobile} {
    justify-content: center;
  }
`;

const StyledDeleteButton = styled.button`
  text-decoration: underline;
  margin-bottom: 7px;
  color: ${COLORS.GRAY_9F};
`;

const StyledTwinButton = styled(TwinButton)`
  & > button {
    border-radius: 8px;
  }
`;
