import Ellipse from '@/public/assets/icons/ChipEllipse.svg';
import { COLORS } from '@/styles/palettes';
import { selectSize } from '@/utils/selectFontSize';
import Image from 'next/image';
import { styled } from 'styled-components';

interface StatusChipProps {
  size: string;
  content: string;
}

function StatusChip({ size, content }: StatusChipProps) {
  const fontSize = selectSize(size);
  return (
    <StyledContainer fontSize={fontSize}>
      <Image width={6} height={6} src={Ellipse} alt="동그라미" />
      {content}
    </StyledContainer>
  );
}

export default StatusChip;

const StyledContainer = styled.div<{ fontSize: number }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 11px;
  font-size: ${(props) => props.fontSize}px;
  color: ${COLORS.VIOLET};
  background-color: ${COLORS.VIOLET_LIGHT};
`;
