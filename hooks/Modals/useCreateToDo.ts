import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import useUser from '@/hooks/global/useUser';
import { CreateCardProps } from '@/types/api';
import useImgSrc from '@/hooks/DropDown/useImgSrc';
import useManager from '@/hooks/DropDown/useManager';
import useInputData from '@/hooks/DropDown/useInputData';
import useGetMember from '@/hooks/DropDown/useGetMember';
import { default as API, default as api } from '@/apis/api';
import { INIT_CREATE_TODO } from '@/constants/InitialModalValues';
import { CreateToDoProps } from '@/components/Modal/ModalContent/CreateToDo';
import { Tag, TagProps } from '@/components/Input/ModalInputContainer/TagInput';

function useCreateToDo({ dashboardInfos, onOkClick }: CreateToDoProps) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [values, setValues] = useState(INIT_CREATE_TODO);
  const [isLoading, setIsLoading] = useState(false);

  const { setInputData } = useInputData();
  const { setImgSrc } = useImgSrc();
  const { setMembers } = useGetMember();
  const { manager } = useManager();
  const { user } = useUser();

  const handleChange = (inputLabel: string, inputValue: string | {} | TagProps[] | ArrayBuffer | null) => {
    setValues({
      ...values,
      [inputLabel]: inputValue,
    });
  };

  const handleSetMembers = async () => {
    const getMember = await API.members.getMembersInDashboard({ dashboardId: dashboardInfos.dashboardId });
    setMembers(getMember);
  };

  const changeProfile = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios
        .post(`https://sp-taskify-api.vercel.app/1-4/columns/${dashboardInfos.columnId}/card-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getCookie('accessToken')}`,
            withCredentials: true,
          },
        })
        .then();
      const { imageUrl } = response.data;
      return imageUrl;
    }
  };

  const handleCreateToDoSubmit = async () => {
    setIsLoading(true);

    const formatTagData: string[] = values.태그.map((tagEl: Tag) =>
      [tagEl.value, tagEl.color, tagEl.backgroundColor].join('/'),
    );

    const CardContentImgUrl = await changeProfile().then();

    /**
     * 필수 입력 요소: dashboardId, columnId, title, description
     */
    let body: CreateCardProps = {
      dashboardId: dashboardInfos.dashboardId,
      columnId: dashboardInfos.columnId,
      title: values.제목,
      description: values.설명,
      assigneeUserId: manager ?? user?.id,
    };
    if (CardContentImgUrl) body['imageUrl'] = CardContentImgUrl;
    if (values.마감일) body['dueDate'] = values.마감일;
    if (formatTagData) body['tags'] = formatTagData;

    const response = await api.cards.createCard(body).catch((error) => toast.error(error.data.message));
    setIsLoading(false);

    if (response) onOkClick();
  };

  useEffect(() => {
    setImgSrc('');
    setInputData('');
    handleSetMembers();
  }, [setImgSrc, setInputData]);

  return { handleChange, setImage, previewImage, setPreviewImage, handleCreateToDoSubmit, isLoading, values };
}

export default useCreateToDo;
