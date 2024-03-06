import ColorChip from '@/components/Chip/ColorChip';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import { StyledButtonContainer, StyledTwinButton } from '@/components/Modal/ModalContent/CreateToDo';
import { INIT_CREATE_DASHBOARD } from '@/constants/InitialModalValues';
import { ModalCommonProps } from '@/types/modal';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

function CreateDashboard({ onCancelClick = () => {}, onOkClick, getValue = () => {} }: ModalCommonProps) {
  const [values, setValues] = useState(INIT_CREATE_DASHBOARD);

  const handleChange = (inputLabel: string, inputValue: string) => {
    setValues({
      ...values,
      [inputLabel]: inputValue,
    });
  };

  const handleSubmit = () => {
    if (values['대시보드 이름'].length === 0) {
      toast.error('값을 입력해 주세요.');
    } else if (values['대시보드 이름'].length > 10) {
      toast.error('10글자 이하로 작성해 주세요.');
    } else {
      onOkClick();
    }
  };

  useEffect(() => {
    getValue(values);
  }, [getValue, values]);

  return (
    <>
      <StyledContainer>
        <BasicInput
          label="대시보드 이름"
          placeholder="뉴 프로젝트"
          onChange={handleChange}
          inputValue={values['대시보드 이름']}
        />
        <ColorChip onChange={handleChange} />
      </StyledContainer>

      <StyledButtonContainer>
        <StyledTwinButton
          text1="취소"
          text2="생성"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={handleSubmit}
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
