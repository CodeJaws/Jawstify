import FormInput from '@/components/Input/FormInput';
import Button from '@/components/common/Button/Button';
import usePasswordManagerBox from '@/hooks/MyPage/usePasswordManagerBox';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

import { styled } from 'styled-components';

function PasswordManagerBox() {
  const {
    errors,
    handleCheck,
    handleSubmit,
    isActivate,
    newPasswordCheckRegister,
    newPasswordRegister,
    onSubmit,
    passwordRegister,
  } = usePasswordManagerBox();

  return (
    <StyledContainer>
      <StyledTitle>비밀번호 변경</StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)} onChange={handleCheck}>
        <FormInput register={passwordRegister} label="현재 비밀번호" errorMessage={errors.password?.message} />
        <FormInput register={newPasswordRegister} label="새 비밀번호" errorMessage={errors.newPassword?.message} />
        <FormInput
          register={newPasswordCheckRegister}
          label="새 비밀번호 확인"
          errorMessage={errors.newPasswordCheck?.message}
        />
        <StyledButton text={'변경'} size={'small'} isViolet={true} disabled={isActivate} />
      </StyledForm>
    </StyledContainer>
  );
}

export default PasswordManagerBox;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  height: auto;
  margin-top: 12px;
  gap: 32px;
  padding: 32px 28px 28px 28px;
  border-radius: 8px;
  background: ${COLORS.WHITE_FF};
  background: var(--content-color);

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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const StyledButton = styled(Button)`
  margin-left: auto;

  ${onMobile} {
    width: 84px;
    gap: 16px;
  }
`;
