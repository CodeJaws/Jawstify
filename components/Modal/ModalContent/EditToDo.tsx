import API from '@/apis/api';
import AddImageButton from '@/components/AddImageButton/AddImageButton';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import DateInput from '@/components/Input/ModalInputContainer/DateInput';
import TagInput, { Tag, TagProps } from '@/components/Input/ModalInputContainer/TagInput';
import ModalDropDown from '@/components/ModalDropDown/ModalDropDown';
import TwinButton from '@/components/common/Button/TwinButton';
import useManager from '@/hooks/DropDown/useManager';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardData from '@/hooks/ModalCard/useCardData';
import useColumnId from '@/hooks/ModalCard/useColumnId';
import useRefresh from '@/hooks/useRefresh';
import { onMobile } from '@/styles/mediaQuery';
import { ModalCommonProps } from '@/types/modal';
import axios from 'axios';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

function EditToDo({ onCancelClick = () => {}, getValue = () => {} }: ModalCommonProps) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const { cardData } = useCardData();
  const { columnId } = useColumnId();
  const { manager } = useManager();
  const { status } = useSelectStatus();
  const { refresh, setRefresh } = useRefresh();

  const splitTag = cardData.tags.map((tag) => tag.split('/'));

  const tagData: Tag[] = splitTag.map((tag) => {
    return { value: tag[0], color: tag[1], backgroundColor: tag[2] };
  });

  const [values, setValues] = useState({
    상태: status,
    담당자: cardData.assignee.nickname,
    제목: cardData.title,
    설명: cardData.description,
    마감일: cardData.dueDate,
    태그: tagData,
    이미지: cardData.imageUrl,
  });

  const cardId = cardData.id;
  const assigneeUserId = manager;
  const title = values.제목;
  const description = values.설명;
  const dueDate = values.마감일;
  const tags = values.태그.map((tagEl: Tag) => [tagEl.value, tagEl.color, tagEl.backgroundColor].join('/'));
  const imageUrl = values.이미지;

  const handleChange = useCallback(
    (inputLabel: string, inputValue: string | {} | TagProps[] | ArrayBuffer | null) => {
      setValues({
        ...values,
        [inputLabel]: inputValue,
      });
    },
    [values],
  );

  getValue(values);

  const changeProfile = async () => {
    if (!image) {
      await API.cards
        .correctCard({ cardId, columnId, assigneeUserId, title, description, dueDate, tags, imageUrl })
        .then(() => alert('할 일 수정완료 🍀'));
      setRefresh(!refresh);
    } else {
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

      await API.cards
        .correctCard({ cardId, columnId, assigneeUserId, title, description, dueDate, tags, imageUrl })
        .then(() => alert('할 일 수정완료 🍀'));
      setRefresh(!refresh);
    }
    onCancelClick();
  };

  return (
    <>
      <StyledContainer>
        <StyledModalContainer>
          <ModalDropDown type="status" onChange={handleChange} />
          <ModalDropDown type="manager" onChange={handleChange} />
        </StyledModalContainer>
        <BasicInput isNecessary label="제목" onChange={handleChange} inputValue={values.제목} />
        <BasicInput isNecessary isTextArea label="설명" onChange={handleChange} inputValue={values.설명} />
        <DateInput onChange={handleChange} />
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
