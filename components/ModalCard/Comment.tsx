import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import useComment from '@/hooks/useComment';
import useUser from '@/hooks/useUser';
import DefaultImg from '@/public/assets/images/jaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import dateTimeFormat from '@/utils/dateTimeFormat';

import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

function Comment() {
  const { user } = useUser();
  const {
    value,
    comment,
    updatedCommentMap,
    hasMore,
    isUpdateMap,
    isOpenComment,
    handleUpdateInputChange,
    updateComment,
    handleChange,
    submitComment,
    deleteComment,
    fetchHasMore,
    CommentWrapperRef,
  } = useComment();

  return (
    <StyledContainer>
      <BasicInput
        label="댓글"
        inputValue={value}
        onChange={(label, value) => {
          handleChange(value);
        }}
        onButtonClick={() => {
          submitComment.mutate();
        }}
      />

      {comment?.length === 0 ? (
        <></>
      ) : (
        <StyledCommentWrapper ref={CommentWrapperRef}>
          <InfiniteScroll pageStart={0} loadMore={fetchHasMore} hasMore={hasMore} useWindow={false} initialLoad={false}>
            {comment?.map((val) => (
              <StyledInCommentWrapper key={val.id}>
                <StyledImage
                  width={34}
                  height={34}
                  src={val?.author?.profileImageUrl || DefaultImg}
                  alt="프로필 이미지"
                />
                <StyledCommentContent>
                  <StyledInComment>
                    <StyledUser>{val.author.nickname}</StyledUser>
                    <StyledDate>{dateTimeFormat(val.createdAt)}</StyledDate>
                  </StyledInComment>
                  {isUpdateMap[val.id] ? (
                    <StyledInputWrapper>
                      <StyledInput
                        value={updatedCommentMap[val.id]}
                        onChange={(e) => handleUpdateInputChange(val.id, e)}
                        placeholder="수정할 내용을 입력하세요."
                      />
                      <StyledButtonInWrapper>
                        <StyledButton onClick={() => updateComment.mutate(val.id)}>완료</StyledButton>
                        <StyledButton onClick={() => isOpenComment(val.id)}>취소</StyledButton>
                      </StyledButtonInWrapper>
                    </StyledInputWrapper>
                  ) : (
                    <StyledComment>{val.content}</StyledComment>
                  )}
                  {!isUpdateMap[val.id] && val.author.id === user?.id && (
                    <StyledButtonWrapper>
                      <StyledButton onClick={() => isOpenComment(val.id)}>수정</StyledButton>
                      <StyledButton onClick={() => deleteComment.mutate(val.id)}>삭제</StyledButton>
                    </StyledButtonWrapper>
                  )}
                </StyledCommentContent>
              </StyledInCommentWrapper>
            ))}
          </InfiniteScroll>
        </StyledCommentWrapper>
      )}
    </StyledContainer>
  );
}

export default Comment;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;

  ${onTablet} {
    gap: 30px;
  }

  ${onMobile} {
    overflow: hidden;
    gap: 16px;
    margin-top: 19px;
  }
`;

const StyledCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 135px;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 10px;
    background: ${COLORS.GRAY_D9};
  }
  ${onMobile} {
    height: 138px;
  }
`;

const StyledInCommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 15px;
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
  color: var(--content-main);

  ${onMobile} {
    font-size: 1.2rem;
  }
`;

const StyledDate = styled.p`
  ${fontStyle(12, 400)}
  color: ${COLORS.GRAY_9F};

  ${onMobile} {
    font-size: 1rem;
  }
`;

const StyledComment = styled.p`
  ${fontStyle(14, 400)}
  color: ${COLORS.GRAY_9F};

  ${onMobile} {
    font-size: 1.2rem;
  }
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
