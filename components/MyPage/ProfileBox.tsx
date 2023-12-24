import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { useState } from 'react';
import { styled } from 'styled-components';
import AddImageButton from '../AddImageButton/AddImageButton';
import FormInput from '../Input/FormInput';
import Button from '../common/Button/Button';

function ProfileBox() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const handleSave = () => {
    return;
  };
  return (
    <StyledContainer>
      <AddImageButton type={'profile'} image={image} setImage={setImage} />
      <StyledWrapper>
        <FormInput label="이메일" />
        <FormInput label="닉네임" />
        <StyledButton text={'저장'} size={'small'} isViolet={true} onClick={handleSave} className={''} />
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
  justify-content: center;
  align-items: end;
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
