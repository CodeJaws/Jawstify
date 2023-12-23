import styled from 'styled-components';
import { StyledButtonContainer, StyledTwinButton } from './Create&EditToDo';
import { ModalOnClickProps } from '@/types/modal';
import ColorChip from '@/components/Chip/ColorChip';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';

function CreateDashboard({ onCancelClick, onOkClick }: ModalOnClickProps) {
  return (
    <>
      <StyledContainer>
        <BasicInput label="대시보드 이름" placeholder="뉴 프로젝트"></BasicInput>
        <ColorChip />
      </StyledContainer>

      <StyledButtonContainer>
        <StyledTwinButton
          text1="취소"
          text2="생성"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={onOkClick}
        ></StyledTwinButton>
      </StyledButtonContainer>
    </>
  );
}

export default CreateDashboard;

const StyledContainer = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;
