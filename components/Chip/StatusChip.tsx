import Ellipse from '@/public/assets/icons/ChipEllipse.svg';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import { styled } from 'styled-components';

interface StatusChipProps {
  content: string;
}

function StatusChip({ content }: StatusChipProps) {
  return (
    <StyledContainer>
      <Image width={6} height={6} src={Ellipse} alt="동그라미" />
      {content}
    </StyledContainer>
  );
}

export default StatusChip;

const StyledContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 11px;
  font-size: 1.2rem;
  color: ${COLORS.VIOLET_55};
  background-color: ${COLORS.VIOLET_F1};

  ${onMobile} {
    font-size: 1rem;
  }
`;
