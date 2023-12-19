import { BACK_END, MAX_LEVEL, NORMAL, PROJECT } from '@/constants/Chip';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import styled from 'styled-components';

interface ChipProps {
  content: string;
}

function ContentChip({ content }: ChipProps) {
  const getColor = (content: string) => {
    switch (content) {
      case PROJECT:
        return {
          color: `${COLORS.ORANGE_D5}`,
          background: `${COLORS.ORANGE_F9}`,
        };
      case NORMAL:
        return {
          color: `${COLORS.GREEN_86}`,
          background: `${COLORS.GREEN_E7}`,
        };
      case BACK_END:
        return {
          color: `${COLORS.PINK_D5}`,
          background: `${COLORS.PINK_DB}`,
        };
      case MAX_LEVEL:
        return {
          color: `${COLORS.BLUE_49}`,
          background: `${COLORS.BLUE_F7}`,
        };
      default:
        return {
          color: `${COLORS.WHITE}`,
          background: `${COLORS.BLACK_300}`,
        };
    }
  };
  const { color, background } = getColor(content);
  return (
    <StyledContainer color={color} background={background}>
      {content}
    </StyledContainer>
  );
}

export default ContentChip;

const StyledContainer = styled.div<{ color: string; background: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 1.2rem;
  color: ${(props) => props.color};
  background: ${(props) => props.background};

  ${onMobile} {
    font-size: 1rem;
  }
`;
