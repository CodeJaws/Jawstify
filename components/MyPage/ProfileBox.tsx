import API from '@/apis/api';
import { IMG_URL_ERROR, NICKNAME_ERROR, NICKNAME_IMG_ERROR } from '@/constants/ErrorMsg';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';
import AddImageButton from '../AddImageButton/AddImageButton';
import BasicInput from '../Input/ModalInputContainer/BasicInput';
import Button from '../common/Button/Button';
import useUserData from '@/hooks/global/useUserData';

interface Props {
  email: string;
  nickname: string;
  profileImg: string | ArrayBuffer | null;
  setNickName: Dispatch<SetStateAction<string>>;
  setPreviewImage: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
}

function ProfileBox({ email, nickname, profileImg, setNickName, setPreviewImage }: Props) {
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

  return (
    <StyledContainer>
      <AddImageButton
        type={'profile'}
        profileImg={profileImg}
        image={profileImg}
        previewImage={profileImg}
        setPreviewImage={setPreviewImage}
        setImage={setImage}
      />
      <StyledWrapper>
        <BasicInput label="이메일" inputValue={email} disabled />
        <BasicInput
          label="닉네임"
          inputValue={nickname}
          onChange={(label, value) => setNickName(value)}
          errorMessage={errorMsg}
        />
        <StyledButton text={'저장'} size={'small'} isViolet={true} onClick={changeProfile} />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default ProfileBox;

const StyledContainer = styled.div`
  display: flex;
  width: 620px;
  height: 355px;
  margin-top: 24px;
  padding: 32px 28px 28px 28px;
  gap: 16px;
  border-radius: 8px;
  background: ${COLORS.WHITE_FF};

  ${onTablet} {
    width: 100%;
  }
  ${onMobile} {
    flex-direction: column;
    width: 100%;
    height: auto;
    gap: 24px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  gap: 20px;

  ${onMobile} {
    margin-top: 0;
    gap: 16px;
  }
`;

const StyledButton = styled(Button)`
  ${onMobile} {
    width: 84px;
  }
`;
