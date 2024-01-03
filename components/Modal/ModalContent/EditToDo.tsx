import AddImageButton from '@/components/AddImageButton/AddImageButton';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import DateInput from '@/components/Input/ModalInputContainer/DateInput';
import TagInput from '@/components/Input/ModalInputContainer/TagInput';
import ModalDropDown from '@/components/ModalDropDown/ModalDropDown';
import TwinButton from '@/components/common/Button/TwinButton';
import useEditTodo from '@/hooks/ModalCard/useEditTodo';
import { onMobile } from '@/styles/mediaQuery';
import { ModalCommonProps } from '@/types/modal';
import styled from 'styled-components';

function EditToDo({ onCancelClick = () => {}, getValue = () => {} }: ModalCommonProps) {
  const { values, cardData, setImage, previewImage, setPreviewImage, changeProfile, handleChange } = useEditTodo();

  getValue(values);

  return (
    <>
      <StyledContainer>
        <StyledModalContainer>
          <ModalDropDown type="status" onChange={handleChange} />
          <ModalDropDown type="manager" onChange={handleChange} />
        </StyledModalContainer>
        <BasicInput isNecessary label="제목" onChange={handleChange} inputValue={values.제목} />
        <BasicInput isNecessary isTextArea label="설명" onChange={handleChange} inputValue={values.설명} />
        <DateInput onChange={handleChange} defaultValue={cardData.dueDate} />
        <TagInput onChange={handleChange} />
        <AddImageButton
          type="modal"
          image={cardData.imageUrl}
          setImage={setImage}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </StyledContainer>
      <StyledButtonContainer>
        <StyledTwinButton
          text1="취소"
          text2="수정"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={changeProfile}
        />
      </StyledButtonContainer>
    </>
  );
}

export default EditToDo;

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
