import { BACK_END, MAX_LEVEL, NORMAL, PROJECT } from '@/constants/Chip';
import styled from 'styled-components';

interface ChipProps {
  content: string;
}

function Chip({ content }: ChipProps) {
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
  const { color, background } = getColor(content);
  return (
    <StyledContainer color={color} background={background}>
      {content}
    </StyledContainer>
  );
}

export default Chip;

const StyledContainer = styled.div<{ color: string; background: string }>`
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;

  color: ${(props) => props.color};
  background: ${(props) => props.background};
`;
