import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { useState } from 'react';
import { styled } from 'styled-components';
import BasicInput from '../Input/ModalInputContainer/BasicInput';
import Button from '../common/Button/Button';

function PasswordManagerBox() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleSave = () => {
    console.log('버튼 눌림');
  };
  return (
    <StyledContainer>
      <StyledTitle>비밀번호 변경</StyledTitle>
      <StyledWrapper>
        <BasicInput label="현재 비밀번호" placeholder="현재 비밀번호 입력" />
        <BasicInput label="새 비밀번호" placeholder="새 비밀번호 입력" />
        <BasicInput label="새 비밀번호 확인" placeholder="새 비밀번호 확인 입력" />
        <StyledButton text={'변경'} size={'small'} isViolet={true} onClick={handleSave} className={''} />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default PasswordManagerBox;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  height: 454px;
  margin-top: 24px;
  padding: 32px 28px 28px 28px;
  gap: 16px;
  border-radius: 8px;
  background: ${COLORS.WHITE_FF};

  ${onTablet} {
    width: 100%;
  }
  ${onMobile} {
    width: 100%;
  }
`;

const StyledTitle = styled.p`
  ${fontStyle(24, 700)}
  ${onMobile} {
    font-size: 2rem;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin-top: 32px;
  flex-grow: 2;
  gap: 20px;
`;

const StyledButton = styled(Button)`
  ${onMobile} {
    width: 84px;
  }
`;
