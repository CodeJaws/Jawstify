import { QUERY_KEYS } from '@/constants/QueryKey';
import API from '@/apis/api';
import { Tag, TagProps } from '@/components/Input/ModalInputContainer/TagInput';
import useRefresh from '@/hooks/Common/useRefresh';
import useManager from '@/hooks/DropDown/useManager';
import useModalOpen from '@/hooks/DropDown/useModalOpen';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardId from '@/hooks/ModalCard/useCardId';
import useColumnId from '@/hooks/ModalCard/useColumnId';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import { GetCardDetailsItem, UploadCardImageProps } from '@/types/api';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  imageUrl?: string;
}

function useEditTodo() {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const { columnId } = useColumnId();
  const { manager } = useManager();
  const { status } = useSelectStatus();
  const { setIsModalOpen } = useModalOpen();
  const { cardId: cdId } = useCardId();
  const { dashboardId } = useDashBoardId();
  const { refresh, setRefresh } = useRefresh();

  const queryClient = useQueryClient();
  const card = queryClient.getQueryData(['card', cdId]);
  const cardData = card as GetCardDetailsItem;

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

  const correctCard = useMutation({
    mutationFn: async ({ imageUrl }: Props) => {
      await API.cards.correctCard({ cardId, columnId, assigneeUserId, title, description, dueDate, tags, imageUrl });
    },
    onSuccess: () => {
      // TODO: setRefresh 추후 삭제예정
      setRefresh(!refresh);
      toast.success('할 일 수정완료');
    },
    onError: () => toast.error('할 일 수정실패'),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.card, cardId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.dashboard, dashboardId] });
    },
  });

  const correctCardImg = useMutation({
    mutationFn: async ({ columnId, formData }: UploadCardImageProps) => {
      const res = await API.columns.uploadCardImage({ columnId, formData });
      return res.imageUrl;
    },
    onSuccess: (imageUrl) => {
      correctCard.mutate({ imageUrl });
    },
    onError: () => toast.error('이미지 업로드 실패'),
  });

  const changeProfile = async () => {
    if (!image) {
      correctCard.mutate({ imageUrl });
    } else {
      const formData = new FormData();
      formData.append('image', image);
      correctCardImg.mutate({ columnId, formData });
    }
    setIsModalOpen(false);
  };
  return { values, cardData, setImage, previewImage, setPreviewImage, handleChange, changeProfile };
}

export default useEditTodo;
