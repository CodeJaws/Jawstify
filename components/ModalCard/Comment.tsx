import { ModalContext } from '@/pages/modalcard';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { useContext } from 'react';
import styled from 'styled-components';
import BasicInput from '../Input/ModalInputContainer/BasicInput';

function Comment() {
  const { userProfileImg, userName, createdAt, comment } = useContext(ModalContext);
  return (
    <StyledContainer>
      <BasicInput label="댓글" />
      <StyledInCommentWrapper>
        <StyledImage width={34} height={34} src={userProfileImg} alt="프로필 이미지" />
        <StyledCommentContent>
          <StyledInComment>
            <StyledUser>{userName}</StyledUser>
            <StyledDate>{createdAt}</StyledDate>
          </StyledInComment>
          <StyledComment>{comment}</StyledComment>
          <StyledButtonWrapper>
            <StyledButton>수정</StyledButton>
            <StyledButton>삭제</StyledButton>
          </StyledButtonWrapper>
        </StyledCommentContent>
      </StyledInCommentWrapper>
    </StyledContainer>
  );
}

export default Comment;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
`;

const StyledInCommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const StyledImage = styled(Image)`
  ${onMobile} {
    width: 26px;
    height: 26px;
  }
`;

const StyledCommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 6px;
`;

const StyledButton = styled.button`
  padding: 0;
  ${fontStyle(12, 400)}
  ${onMobile} {
    font-size: 1rem;
  }
  color: ${COLORS.GRAY_9F};
  text-decoration: underline;
`;

const StyledInComment = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledUser = styled.p`
  ${fontStyle(14, 600)}

  ${onMobile} {
    font-size: 1.2rem;
  }

  color: ${COLORS.BLACK_33};
`;

const StyledDate = styled.p`
  ${fontStyle(12, 400)}

  ${onMobile} {
    font-size: 1rem;
  }

  color: ${COLORS.GRAY_9F};
`;

const StyledComment = styled.p`
  ${fontStyle(14, 400)}
  ${onMobile} {
    font-size: 1.2rem;
  }
  color: ${COLORS.GRAY_9F};
`;
