import { BACK_END, MAX_LEVEL, NORMAL, PROJECT } from '@/constants/Chip';
import { selectSize } from '@/utils/selectFontSize';
import styled from 'styled-components';

interface ChipProps {
  size: string;
  content: string;
}

function ContentChip({ size, content }: ChipProps) {
  const getColor = (content: string) => {
    switch (content) {
      case PROJECT:
        return {
          color: '#D58D49',
          background: '#F9EEE3',
        };
      case NORMAL:
        return {
          color: '#86D549',
          background: '#E7F7DB',
        };
      case BACK_END:
        return {
          color: '#D549B6',
          background: '#F7DBF0',
        };
      case MAX_LEVEL:
        return {
          color: '#4981D5',
          background: '#DBE6F7',
        };
      default:
        return {
          color: '#fff',
          background: '#000',
        };
    }
  };
  const fontSize = selectSize(size);
  const { color, background } = getColor(content);
  return (
    <StyledContainer fontSize={fontSize} color={color} background={background}>
      {content}
    </StyledContainer>
  );
}

export default ContentChip;

const StyledContainer = styled.div<{ fontSize: number; color: string; background: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
`;
