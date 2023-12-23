import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { onMobile } from '@/styles/mediaQuery';
import { ModalOnClickProps } from '@/types/modal';
import AddImageButton from '@/components/AddImageButton/AddImageButton';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import DateInput from '@/components/Input/ModalInputContainer/DateInput';
import TagInput from '@/components/Input/ModalInputContainer/TagInput';
import ModalDropDown from '@/components/ModalDropDown/ModalDropDown';
import TwinButton from '@/components/common/Button/TwinButton';

interface Props extends ModalOnClickProps {
  type: 'create' | 'edit';
  image: string | ArrayBuffer | null;
  setImage: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
}

function CreateToDo({ onOkClick, onCancelClick, type, image, setImage }: Props) {
  return (
    <>
      <StyledContainer>
        <StyledModalContainer>
          <ModalDropDown />
          {type === 'edit' && <ModalDropDown />}
        </StyledModalContainer>
        <BasicInput isNecessary label="제목"></BasicInput>
        <BasicInput isNecessary isTextArea label="설명"></BasicInput>
        <DateInput />
        <TagInput />
        <AddImageButton type="modal" image={image} setImage={setImage} />
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

export default CreateToDo;

const StyledContainer = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 27px;
  ${onMobile} {
    gap: 22px;
  }
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;

  ${onMobile} {
    justify-content: center;
  }
`;

const StyledModalContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${onMobile} {
    flex-direction: column;
    gap: 22px;
  }
`;

export const StyledTwinButton = styled(TwinButton)`
  & > button {
    border-radius: 8px;
  }
`;
