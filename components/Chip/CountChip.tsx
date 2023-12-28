import { COLORS } from '@/styles/palettes';

import { styled } from 'styled-components';

interface CountChipProps {
  // content: string;
  content: number;
}

function CountChip({ content }: CountChipProps) {
  return <StyledContainer>{content}</StyledContainer>;
}

export default CountChip;

const StyledContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: ${COLORS.GRAY_78};
  background-color: ${COLORS.GRAY_EE};
`;
