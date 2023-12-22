import Button from '@/components/common/Button/Button';
import TwinButton from '@/components/common/Button/TwinButton';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import styled from 'styled-components';

interface Props {
  description: string;
  isSingleButton: boolean;
  onOkClick: () => void;
  onCancelClick: () => void;
}

function NoTitle({ description, isSingleButton, onCancelClick = () => {}, onOkClick }: Props) {
  return (
    <StyledContainer>
      <StyledDescription>{description}</StyledDescription>;
      {isSingleButton ? (
        <StyledButtonWrapper>
          <StyledButton text="확인" size="large" onClick={onOkClick} isViolet />
        </StyledButtonWrapper>
      ) : (
        <StyledTwinButton
          text1="취소"
          text2="삭제"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={onOkClick}
        ></StyledTwinButton>
      )}
    </StyledContainer>
  );
}

export default NoTitle;

const StyledContainer = styled.div`
  white-space: nowrap;
`;

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

const StyledTwinButton = styled(TwinButton)`
  justify-content: flex-end;
  & > button {
    border-radius: 8px;
  }
`;
