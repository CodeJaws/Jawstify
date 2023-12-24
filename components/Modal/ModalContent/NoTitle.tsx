import styled from 'styled-components';
import { ModalCommonProps } from '@/types/modal';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { StyledTwinButton } from './Create&EditToDo';
import { StyledContainer } from './Basic';
import Button from '@/components/common/Button/Button';

interface Props extends ModalCommonProps {
  description: string;
  isSingleButton: boolean;
}

function NoTitle({ description, isSingleButton, onOkClick, onCancelClick = () => {} }: Props) {
  return (
    <StyledContainer>
      <StyledDescription>{description}</StyledDescription>;
      {isSingleButton ? (
        <StyledButtonWrapper>
          <StyledButton text="확인" size="large" onClick={onOkClick} isViolet />
        </StyledButtonWrapper>
      ) : (
        <StyledTwinButton2
          text1="취소"
          text2="삭제"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={onOkClick}
        ></StyledTwinButton2>
      )}
    </StyledContainer>
  );
}

export default NoTitle;

const StyledDescription = styled.h5`
  ${fontStyle(18, 500)}
  margin-bottom: 50px;
  margin-top: 40px;
  text-align: center;

  ${onMobile} {
    ${fontStyle(16, 500)}
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  ${onMobile} {
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
`;

const StyledTwinButton2 = styled(StyledTwinButton)`
  justify-content: flex-end;
`;
