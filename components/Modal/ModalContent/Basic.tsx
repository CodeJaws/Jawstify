import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TwinButton from '@/components/common/Button/TwinButton';
import { onMobile } from '@/styles/mediaQuery';
import styled from 'styled-components';

interface Props {
  type: '초대하기' | '새 칼럼 생성';
  onOkClick: () => void;
  onCancelClick: () => void;
}

function Basic({ onCancelClick, onOkClick, type }: Props) {
  return (
    <>
      <StyledContainer>
        {type === '초대하기' && <BasicInput label="이메일" />}
        {type === '새 칼럼 생성' && <BasicInput label="이름" placeholder="새로운 프로젝트" />}
      </StyledContainer>

      <StyledButtonContainer>
        <StyledTwinButton
          text1="취소"
          text2={type === '초대하기' ? '초대' : '생성'}
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={onOkClick}
        ></StyledTwinButton>
      </StyledButtonContainer>
    </>
  );
}

export default Basic;

const StyledContainer = styled.div`
  white-space: nowrap;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 38.4px;

  ${onMobile} {
    justify-content: center;
  }
`;

const StyledTwinButton = styled(TwinButton)`
  & > button {
    border-radius: 0.5rem;
  }
`;
