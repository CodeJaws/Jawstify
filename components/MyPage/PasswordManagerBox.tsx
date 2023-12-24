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
  margin-top: 12px;
  gap: 32px;
  padding: 32px 28px 28px 28px;
  border-radius: 8px;
  background: ${COLORS.WHITE_FF};

  ${onTablet} {
    width: 100%;
    height: auto;
  }
  ${onMobile} {
    width: 100%;
    height: auto;
    gap: 24px;
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
  gap: 20px;
`;

const StyledButton = styled(Button)`
  ${onMobile} {
    width: 84px;
    gap: 16px;
  }
`;
