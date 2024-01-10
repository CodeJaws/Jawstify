import API from '@/apis/api';
import axios from 'axios';
import { useCallback, useState } from 'react';

import { Tag, TagProps } from '@/components/Input/ModalInputContainer/TagInput';
import useManager from '../DropDown/useManager';
import useModalOpen from '../DropDown/useModalOpen';
import useSelectStatus from '../DropDown/useSelectStatus';
import useRefresh from '../Common/useRefresh';
import useCardData from '../ModalCard/useCardData';
import useColumnId from '../ModalCard/useColumnId';

function useEditTodo() {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const { cardData } = useCardData();
  const { columnId } = useColumnId();
  const { manager } = useManager();
  const { status } = useSelectStatus();
  const { refresh, setRefresh } = useRefresh();
  const { setIsModalOpen } = useModalOpen();

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
    setIsModalOpen(false);
  };
  return { values, cardData, setImage, previewImage, setPreviewImage, handleChange, changeProfile };
}

export default useEditTodo;
