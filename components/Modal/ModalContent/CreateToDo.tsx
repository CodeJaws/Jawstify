import API from '@/apis/api';
import AddImageButton from '@/components/AddImageButton/AddImageButton';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import DateInput from '@/components/Input/ModalInputContainer/DateInput';
import TagInput, { Tag, TagProps } from '@/components/Input/ModalInputContainer/TagInput';
import ModalDropDown from '@/components/ModalDropDown/ModalDropDown';
import TwinButton from '@/components/common/Button/TwinButton';
import { INIT_CREATE_N_EDIT_TODO } from '@/constants/InitialModalValues';
import useManager from '@/hooks/DropDown/useManager';
import { onMobile } from '@/styles/mediaQuery';
import { ModalCommonProps } from '@/types/modal';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const columnId = 1025; // 수정 필요 (props로 받아오야함)

function CreateToDo({ onCancelClick = () => {}, getValue = () => {} }: ModalCommonProps) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [values, setValues] = useState(INIT_CREATE_N_EDIT_TODO);

  const { manager } = useManager();
  const assigneeUserId = manager;

  const handleChange = (inputLabel: string, inputValue: string | {} | TagProps[] | ArrayBuffer | null) => {
    setValues({
      ...values,
      [inputLabel]: inputValue,
    });
  };
  getValue(values);

  const changeProfile = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post(
        `https://sp-taskify-api.vercel.app/1-4/columns/${columnId}/card-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            withCredentials: true,
          },
        },
      );
      const { imageUrl } = response.data;
      const body = {
        cardId: 328,
        dashboardId: 325,
        columnId: columnId,
        assigneeUserId: assigneeUserId,
        title: values.제목,
        description: values.설명,
        dueDate: values.마감일,
        tags: values.태그.map((tagEl: Tag) => [tagEl.value, tagEl.color, tagEl.backgroundColor].join('/')),
        imageUrl: imageUrl,
      };
      await API.cards.createCard(body).then(() => alert('카드 생성완료 🍀'));
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledModalContainer>
          <ModalDropDown type="manager" onChange={handleChange} />
        </StyledModalContainer>
        <BasicInput isNecessary label="제목" onChange={handleChange} inputValue={values.제목}></BasicInput>
        <BasicInput isNecessary isTextArea label="설명" onChange={handleChange} inputValue={values.설명}></BasicInput>
        <DateInput onChange={handleChange} />
        <TagInput onChange={handleChange} />
        <AddImageButton
          type="modal"
          image={null}
          setImage={setImage}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </StyledContainer>

      <StyledButtonContainer>
        <StyledTwinButton
          text1="취소"
          text2="생성"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={changeProfile}
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
