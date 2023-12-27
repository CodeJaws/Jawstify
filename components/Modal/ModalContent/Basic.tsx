import styled from 'styled-components';
import { StyledButtonContainer } from './Create&EditToDo';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TwinButton from '@/components/common/Button/TwinButton';
import { ModalCommonProps } from '@/types/modal';
import { useState } from 'react';

interface Props extends ModalCommonProps {
  type: '초대하기' | '새 칼럼 생성';
}

function Basic({ type, onCancelClick, onOkClick, getValue = () => {} }: Props) {
  const [values, setValues] = useState({
    이메일: '',
    이름: '',
  });

  // onOkClick = () => {
  //   console.log(values); // 모달 input values 확인 가능
  // };

  const handleChange = (inputLabel: string, inputValue: string) => {
    setValues({
      ...values,
      [inputLabel]: inputValue,
    });
  };

  getValue(values);

  return (
    <>
      <StyledContainer>
        {type === '초대하기' && <BasicInput label="이메일" onChange={handleChange} inputValue={values.이메일} />}
        {type === '새 칼럼 생성' && (
          <BasicInput label="이름" placeholder="새로운 프로젝트" onChange={handleChange} inputValue={values.이름} />
        )}
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
