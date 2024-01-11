import AddImageButton from '@/components/AddImageButton/AddImageButton';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import Button from '@/components/common/Button/Button';
import useProfileBox from '@/hooks/MyPage/useProfileBox';
import { onMobile, onTablet } from '@/styles/mediaQuery';

import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';

interface Props {
  email: string;
  nickname: string;
  profileImg: string | ArrayBuffer | null;
  setNickName: Dispatch<SetStateAction<string>>;
  setPreviewImage: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
}

function ProfileBox({ email, nickname, profileImg, setNickName, setPreviewImage }: Props) {
  const { changeProfile, setImage } = useProfileBox({ nickname });

  return (
    <StyledContainer>
      <AddImageButton
        type="profile"
        image={profileImg}
        setImage={setImage}
        previewImage={profileImg}
        setPreviewImage={setPreviewImage}
      />
      <StyledWrapper>
        <BasicInput label="이메일" inputValue={email} disabled />
        <BasicInput label="닉네임" inputValue={nickname} onChange={(label, value) => setNickName(value)} />
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
  background: var(--content-color);

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
