import ColorChip from '@/components/Chip/ColorChip';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TwinButton from '@/components/common/Button/TwinButton';
import { onMobile } from '@/styles/mediaQuery';
import styled from 'styled-components';

interface Props {
  onOkClick: () => void;
  onCancelClick: () => void;
}

function CreateDashboard({ onCancelClick, onOkClick }: Props) {
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

const StyledTwinButton = styled(TwinButton)`
  & > button {
    border-radius: 8px;
  }
`;
