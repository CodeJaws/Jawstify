import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TwinButton from '@/components/common/Button/TwinButton';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import styled from 'styled-components';

interface Props {
  onOkClick: () => void;
  onCancelClick: () => void;
}

function CreateColumn({ onCancelClick, onOkClick }: Props) {
  return (
    <>
      <StyledContainer>
        <BasicInput label="이름" placeholder="새로운 프로젝트"></BasicInput>
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

export default CreateColumn;

const StyledContainer = styled.div`
  /* padding: 100px 160px; */
  white-space: nowrap;
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
