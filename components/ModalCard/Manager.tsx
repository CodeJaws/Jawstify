import useCardId from '@/hooks/ModalCard/useCardId';
import DefaultImg from '@/public/assets/images/jaws.avif';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { GetCardDetailsItem } from '@/types/api';
import dateTimeFormat from '@/utils/dateTimeFormat';
import { useQueryClient } from '@tanstack/react-query';

import Image from 'next/image';
import styled from 'styled-components';

function Manager() {
  const { cardId } = useCardId();
  const queryClient = useQueryClient();
  const cardData = queryClient.getQueryData(['card', cardId]);
  const card = cardData as GetCardDetailsItem;
  return (
    <StyledContainer>
      <StyledInManagerWrapper>
        <StyledManagerWrapper>
          <StyledManager>담당자</StyledManager>
          <StyledManagerProfile>
            <StyledImage
              width={34}
              height={34}
              sizes="100%"
              src={card?.assignee.profileImageUrl || DefaultImg}
              alt="프로필 이미지"
            />
            <StyledManagerName>{card?.assignee.nickname}</StyledManagerName>
          </StyledManagerProfile>
        </StyledManagerWrapper>
        <StyledDeadLineWrapper>
          <StyledDeadLineName>마감일</StyledDeadLineName>
          <StyledDeadLine>{dateTimeFormat(card?.dueDate)}</StyledDeadLine>
        </StyledDeadLineWrapper>
      </StyledInManagerWrapper>
    </StyledContainer>
  );
}

export default Manager;

const StyledContainer = styled.div`
  width: 200px;
  height: 155px;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  background-color: var(--input-bg);

  ${onMobile} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 16px;
    width: 287px;
    height: 64px;
  }
`;

const StyledManagerProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  margin-bottom: 20px;

  ${onMobile} {
    margin: 0;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 20px;

  ${onMobile} {
    width: 26px;
    height: 26px;
  }
`;

const StyledInManagerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  ${onMobile} {
    flex-direction: row;
    gap: 62px;
    padding: 0;
  }
`;

const StyledManagerWrapper = styled.div`
  ${onMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledManager = styled.p`
  color: var(--input-label);
  ${fontStyle(12, 600)};
  line-height: 20px;

  ${onMobile} {
    font-size: 1rem;
  }
`;

const StyledManagerName = styled.p`
  ${fontStyle(14, 400)};
  color: var(--content-main);

  ${onMobile} {
    font-size: 1.2rem;
  }
`;

const StyledDeadLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledDeadLineName = styled.p`
  ${fontStyle(12, 600)};
  line-height: 20px;

  ${onMobile} {
    font-size: 1rem;
  }
`;

const StyledDeadLine = styled.p`
  ${fontStyle(14, 400)};
  color: var(--content-main);
  white-space: nowrap;

  ${onMobile} {
    font-size: 1.2rem;
  }
`;
