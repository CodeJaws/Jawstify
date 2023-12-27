import API from '@/apis/api';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';
import AddImageButton from '../AddImageButton/AddImageButton';
import BasicInput from '../Input/ModalInputContainer/BasicInput';
import Button from '../common/Button/Button';

interface Props {
  email: string;
  nickname: string;
  profileImg: string;
  setNickName: Dispatch<SetStateAction<string>>;
}

function ProfileBox({ email, nickname, profileImg, setNickName }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

  const changeNickName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNickName(e.target.value);
  };

  const changeProfile = async () => {
    if (!image) {
      const profileImageUrl = profileImg;
      await API.users.correctMyInfo({ profileImageUrl, nickname }).then(() => alert('프로필 업데이트 완료 🍀'));
      return;
    } else {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('https://sp-taskify-api.vercel.app/1-4/users/me/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          withCredentials: true,
        },
      });
      const { profileImageUrl } = response.data;

      await API.users.correctMyInfo({ profileImageUrl, nickname }).then(() => alert('프로필 업데이트 완료 🍀'));
    }
  };

  return (
    <StyledContainer>
      <AddImageButton
        type={'profile'}
        profileImg={profileImg}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        setImage={setImage}
      />
      <StyledWrapper>
        <BasicInput label="이메일" inputValue={email} disabled />
        <BasicInput label="닉네임" inputValue={nickname} onChange={changeNickName} />
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
