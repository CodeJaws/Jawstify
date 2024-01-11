import API from '@/apis/api';
import useUserData from '@/hooks/global/useUserData';
import { ErrorProps, formProps } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  nickname: string;
  profileImageUrl?: string;
}

function useProfileBox({ nickname }: Props) {
  const { setUser, user } = useUserData();
  const [image, setImage] = useState<File>();

  const changeNickNameMutation = useMutation({
    mutationFn: async ({ nickname }: Props) => {
      await API.users.correctMyInfo({ nickname });
    },
    onSuccess: () => {
      user.nickname = nickname;
      setUser(user);
      toast.success('프로필 업데이트 완료');
    },
    onError: (error: ErrorProps) => {
      toast.error(error.data.message);
    },
  });

  const changeImgMutation = useMutation({
    mutationFn: async ({ formData }: formProps) => {
      const res = await API.users.profileImgUpload(formData);
      return res.profileImageUrl;
    },
    onSuccess: (profileImageUrl) => {
      changeNickNameMutation.mutate({ nickname, profileImageUrl });
      user.profileImageUrl = profileImageUrl;
      user.nickname = nickname;
      setUser(user);
    },
    onError: (error: ErrorProps) => {
      toast.error(error.data.message);
    },
  });

  const changeProfile = async () => {
    if (!image) {
      changeNickNameMutation.mutate({ nickname });
    } else {
      const formData = new FormData();
      formData.append('image', image);
      if (image.type !== 'image/svg+xml') {
        changeImgMutation.mutate({ formData });
      } else {
        toast.error('형식에 맞는 이미지만 사용가능합니다.');
      }
    }
  };

  return { setImage, changeProfile };
}

export default useProfileBox;
