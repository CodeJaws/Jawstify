import { ColorEllipse } from '@/constants/ColorEllipse';
import useColorChip from '@/hooks/Chip/useColorChip';
import Check from '@/public/assets/icons/Check.svg';
import { onMobile } from '@/styles/mediaQuery';

import Image from 'next/image';
import { styled } from 'styled-components';

export interface ColorChipProps {
  onChange: (inputLabel: string, value: string) => void;
  color?: string;
}

function ColorChip({ onChange, color }: ColorChipProps) {
  const { selectedColor, toggleSelectedColor } = useColorChip({ onChange, color });
  return (
    <StyledContainer>
      {ColorEllipse.map((val, index) => (
        <StyledButton key={val.id} onClick={() => toggleSelectedColor(index)}>
          {selectedColor === index && <StyledCheckImage width={24} height={24} src={Check} alt="체크" />}
          <StyledImage width={30} height={30} src={val.src} alt={val.alt} />
        </StyledButton>
      ))}
    </StyledContainer>
  );
}

export default ColorChip;

const StyledContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
`;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCheckImage = styled(Image)`
  position: absolute;

  ${onMobile} {
    width: 22px;
    height: 22px;
  }
`;

const StyledImage = styled(Image)`
  ${onMobile} {
    width: 28px;
    height: 28px;
  }
`;
