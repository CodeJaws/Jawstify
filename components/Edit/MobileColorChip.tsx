import Image from 'next/image';
import styled from 'styled-components';

import { onMobile } from '@/styles/mediaQuery';
import Green from '@/public/assets/icons/GreenEllipse.svg';
import Orange from '@/public/assets/icons/OrangeEllipse.svg';
import Pink from '@/public/assets/icons/PinkEllipse.svg';
import Blue from '@/public/assets/icons/BlueEllipse.svg';
import Purple from '@/public/assets/icons/PurpleEllipse.svg';
import Check from '@/public/assets/icons/Check.svg';
import { COLORS } from '@/styles/palettes';
import { useEffect, useState } from 'react';

const ColorEllipse = [
  { id: 0, src: Green, alt: '녹색 원', color: COLORS.GREEN_7A },
  { id: 1, src: Purple, alt: '보라색 원', color: COLORS.PURPLE_76 },
  { id: 2, src: Orange, alt: '오렌지 원', color: COLORS.ORANGE_FF },
  { id: 3, src: Blue, alt: '하늘색 원', color: COLORS.BLUE_76 },
  { id: 4, src: Pink, alt: '핑크색 원', color: COLORS.PINK_E8 },
];

interface MobileColorChipProps {
  onChange: (inputLabel: string, value: string) => void;
  color: string;
}

function MobileColorChip({ onChange, color }: MobileColorChipProps) {
  const [selectedColor, setSelectedColor] = useState(-1);

  const toggleSelectedColor = (index: number) => {
    if (index >= 5) {
      setSelectedColor(index - 5);
      const selectedColorText = ColorEllipse[index - 5]?.alt || '';
      onChange('색상', selectedColorText);
    } else {
      setSelectedColor(index);
      const selectedColorText = ColorEllipse[index]?.alt || '';
      onChange('색상', selectedColorText);
    }
  };

  useEffect(() => {
    setSelectedColor(ColorEllipse.find((x) => x.color === color)?.id ?? -1);
  }, [color]);

  if (selectedColor === -1) return null;

  return (
    <StyledContainer>
      <StyledButton key={ColorEllipse[selectedColor].id} onClick={() => toggleSelectedColor(selectedColor + 1)}>
        <StyledCheckImage width={24} height={24} src={Check} alt="체크" />
        <StyledImage
          width={30}
          height={30}
          src={ColorEllipse[selectedColor].src}
          alt={ColorEllipse[selectedColor].alt}
        />
      </StyledButton>
    </StyledContainer>
  );
}

export default MobileColorChip;

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
  width: 30px;
  height: 30px;
  ${onMobile} {
    width: 28px;
    height: 28px;
  }
`;
