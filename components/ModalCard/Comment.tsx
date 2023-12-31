import API from '@/apis/api';
import useCardData from '@/hooks/ModalCard/useCardData';
import useCardId from '@/hooks/ModalCard/useCardId';
import useComment from '@/hooks/ModalCard/useComment';
import useRefresh from '@/hooks/useRefresh';
import Emoji from '@/public/assets/images/emoji.webp';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import dateTimeFormat from '@/utils/dateTimeFormat';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import BasicInput from '../Input/ModalInputContainer/BasicInput';

function Comment() {
  const { comment } = useComment();
  const { cardData } = useCardData();
  const { cardId } = useCardId();
  const { refresh, setRefresh } = useRefresh();

  // 댓글 별로 수정 여부를 관리하는 상태 추가
  const [isUpdateMap, setIsUpdateMap] = useState<{ [key: number]: boolean }>({});
  const [updatedCommentMap, setUpdatedCommentMap] = useState<{ [key: number]: string }>({});
  const [value, setValues] = useState('');

  const isOpenComment = (commentId: number) => {
    setIsUpdateMap((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleUpdateInputChange = (commentId: number, e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedCommentMap((prev) => ({ ...prev, [commentId]: e.target.value }));
  };

  const handleUpdateButtonClick = async (commentId: number) => {
    const content = updatedCommentMap[commentId];
    setIsUpdateMap((prev) => ({ ...prev, [commentId]: false }));
    await API.comments.correctComment({ commentId, content });
    setRefresh(!refresh);
  };

  const handleChange = (e: string) => {
    setValues(e);
  };

  const submitComment = async () => {
    const body = {
      content: value,
      cardId: cardId,
      columnId: cardData.columnId,
      dashboardId: 325, // @TODO 대시보드 아이디 가져오기
    };

    await API.comments.createComment(body);
    setRefresh(!refresh);
    setValues('');
  };

  const deleteComment = async (commentId: number) => {
    if (confirm('댓글을 삭제 하시겠습니까?')) await API.comments.deleteComment({ commentId });
    setRefresh(!refresh);
  };

  return (
    <StyledContainer>
      <BasicInput
        label="댓글"
        inputValue={value}
        onChange={(label, value) => {
          handleChange(value);
        }}
        onButtonClick={() => {
          submitComment();
        }}
      />
      <StyledCommentWrapper>
        {comment.comments.map((val) => (
          <StyledInCommentWrapper key={val.id}>
            {val.author.profileImageUrl ? (
              <StyledImage width={34} height={34} src={val.author.profileImageUrl} alt="프로필 이미지" />
            ) : (
              <StyledImage width={34} height={34} src={Emoji} alt="프로필 이미지" />
            )}
            <StyledCommentContent>
              <StyledInComment>
                <StyledUser>{val.author.nickname}</StyledUser>
                <StyledDate>{dateTimeFormat(val.createdAt)}</StyledDate>
              </StyledInComment>
              {isUpdateMap[val.id] ? (
                <StyledInputWrapper>
                  <StyledInput
                    value={updatedCommentMap[val.id] || val.content}
                    onChange={(e) => handleUpdateInputChange(val.id, e)}
                    placeholder="수정할 내용을 입력하세요."
                  />
                  <StyledButtonInWrapper>
                    <StyledButton onClick={() => handleUpdateButtonClick(val.id)}>완료</StyledButton>
                    <StyledButton onClick={() => isOpenComment(val.id)}>취소</StyledButton>
                  </StyledButtonInWrapper>
                </StyledInputWrapper>
              ) : (
                <StyledComment>{val.content}</StyledComment>
              )}
              {!isUpdateMap[val.id] && (
                <StyledButtonWrapper>
                  <StyledButton onClick={() => isOpenComment(val.id)}>수정</StyledButton>
                  <StyledButton onClick={() => deleteComment(val.id)}>삭제</StyledButton>
                </StyledButtonWrapper>
              )}
            </StyledCommentContent>
          </StyledInCommentWrapper>
        ))}
      </StyledCommentWrapper>
    </StyledContainer>
  );
}

export default Comment;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
  overflow-y: hidden;
`;

const StyledCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  overflow-y: scroll;
  ${onMobile} {
    overflow: visible;
  }
`;

const StyledInCommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
  ${onMobile} {
    width: 26px;
    height: 26px;
  }
`;

const StyledCommentContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  gap: 6px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 6px;
`;

const StyledButtonInWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 10px;
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

const StyledInputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.textarea`
  width: 100%;
  height: auto;
  resize: none;
  padding: 8px 8px;
  border-radius: 8px;
  border: 1px solid ${COLORS.VIOLET_55};
  background-color: ${COLORS.WHITE_FF};
  color: ${COLORS.BLACK_33};
`;
