import styled from 'styled-components';
import { StyledButtonContainer } from './Create&EditToDo';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TwinButton from '@/components/common/Button/TwinButton';
import { ModalOnClickProps } from '@/types/modal';

interface Props extends ModalOnClickProps {
  type: '초대하기' | '새 칼럼 생성';
}

function Basic({ onCancelClick, onOkClick, type }: Props) {
  return (
    <>
      <StyledContainer>
        {type === '초대하기' && <BasicInput label="이메일" />}
        {type === '새 칼럼 생성' && <BasicInput label="이름" placeholder="새로운 프로젝트" />}
      </StyledContainer>

      <StyledButtonContainer2>
        <StyledTwinButton
          text1="취소"
          text2={type === '초대하기' ? '초대' : '생성'}
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={onOkClick}
        ></StyledTwinButton>
      </StyledButtonContainer2>
    </>
  );
}

export default Basic;

export const StyledContainer = styled.div`
  white-space: nowrap;
`;

const StyledButtonContainer2 = styled(StyledButtonContainer)`
  gap: 38.4px;
`;

const StyledTwinButton = styled(TwinButton)`
  & > button {
    border-radius: 5px;
  }
`;
