import { BACK_END, MAX_LEVEL, NORMAL, PROJECT, TO_DO } from '@/constants/Chip';
import CROWN from '@/public/assets/icons/crown.svg';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import { styled } from 'styled-components';
import ContentChip from '../Chip/ContentChip';
import StatusChip from '../Chip/StatusChip';

interface Props {
  title: string;
}

function ModalCard({ title }: Props) {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitleWrapper>
          <StyledTitle>{title}</StyledTitle>
          <StyledTag>
            <StatusChip content={TO_DO} />
            <StyledDivision />
            <StyledColorChipWrapper>
              <ContentChip content={PROJECT} />
              <ContentChip content={NORMAL} />
              <ContentChip content={BACK_END} />
              <ContentChip content={MAX_LEVEL} />
            </StyledColorChipWrapper>
          </StyledTag>
        </StyledTitleWrapper>
        <StyledContentWrapper>
          <StyledContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante
            cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at
            leo.
          </StyledContent>
          <Image width={450} height={262} src={CROWN} alt="왕관" />
        </StyledContentWrapper>
        <StyledCommentWrapper></StyledCommentWrapper>
      </StyledWrapper>
      <StyledRightWrapper>👻</StyledRightWrapper>
    </StyledContainer>
  );
}

export default ModalCard;

const StyledContainer = styled.div`
  display: flex;
  width: 730px;
  height: 763px;
  background-color: ${COLORS.WHITE_FF};
`;

const StyledTitle = styled.p`
  ${fontStyle(24, 700)}
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledTag = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
`;

const StyledCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 24px;
`;

const StyledContent = styled.p`
  ${fontStyle(14, 400)}
  line-height: 24px;
`;

const StyledDivision = styled.div`
  height: 20px;
  border: 1px solid ${COLORS.GRAY_D9};
`;

const StyledColorChipWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const StyledRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
