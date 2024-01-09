import API from '@/apis/api';
import { IMG_URL_ERROR, NICKNAME_ERROR, NICKNAME_IMG_ERROR } from '@/constants/ErrorMsg';
import useUserData from '@/hooks/global/useUserData';

import { useState } from 'react';

interface Props {
  nickname: string;
}

function useProfileBox({ nickname }: Props) {
  const { setUser, user } = useUserData();
  const [image, setImage] = useState<File>();
  const [errorMsg, setErrorMsg] = useState('');

  const changeProfile = async () => {
    if (!image) {
      try {
        await API.users.correctMyInfo({ nickname });
        alert('프로필 업데이트 완료 🍀');
        user.nickname = nickname;
        setUser(user);
      } catch (e: any) {
        switch (e.data.message) {
          case NICKNAME_ERROR:
            setErrorMsg(NICKNAME_ERROR);
            break;
          case NICKNAME_IMG_ERROR:
            setErrorMsg(NICKNAME_IMG_ERROR);
            break;
          case IMG_URL_ERROR:
            setErrorMsg(IMG_URL_ERROR);
            break;
          default:
            setErrorMsg(e.data.message);
            break;
        }
      }

      return;
    } else {
      const formData = new FormData();
      formData.append('image', image);

      if (image.type !== 'image/svg+xml') {
        const response = await API.users.profileImgUpload(formData);
        const { profileImageUrl } = response;
        try {
          await API.users.correctMyInfo({ profileImageUrl, nickname });
          alert('프로필 업데이트 완료 🍀');
          user.profileImageUrl = profileImageUrl;
          user.nickname = nickname;
          setUser(user);
        } catch (e: any) {
          switch (e.data.message) {
            case NICKNAME_ERROR:
              setErrorMsg(NICKNAME_ERROR);
              break;
            case NICKNAME_IMG_ERROR:
              setErrorMsg(NICKNAME_IMG_ERROR);
              break;
            case IMG_URL_ERROR:
              setErrorMsg(IMG_URL_ERROR);
              break;
            default:
              setErrorMsg(e.data.message);
              break;
          }
        }
      } else {
        alert('형식에 맞는 이미지만 사용가능합니다.');
      }
    }
  };

  return { setImage, errorMsg, changeProfile };
}

export default useProfileBox;
