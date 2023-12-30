import Blue from '@/public/assets/icons/BlueEllipse.svg';
import Check from '@/public/assets/icons/Check.svg';
import Green from '@/public/assets/icons/GreenEllipse.svg';
import Orange from '@/public/assets/icons/OrangeEllipse.svg';
import Pink from '@/public/assets/icons/PinkEllipse.svg';
import Purple from '@/public/assets/icons/PurpleEllipse.svg';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import { useState } from 'react';
import { styled } from 'styled-components';

interface Props {
  onChange: (inputLabel: string, value: string) => void;
}
const ColorEllipse = [
  { id: 0, src: Green, alt: '녹색 원', color: COLORS.GREEN_7A },
  { id: 1, src: Purple, alt: '보라색 원', color: COLORS.PURPLE_76 },
  { id: 2, src: Orange, alt: '오렌지 원', color: COLORS.ORANGE_FF },
  { id: 3, src: Blue, alt: '하늘색 원', color: COLORS.BLUE_76 },
  { id: 4, src: Pink, alt: '핑크색 원', color: COLORS.PINK_E8 },
];

function ColorChip({ onChange }: Props) {
  const [selectedColor, setSelectedColor] = useState(0);

  const toggleSelectedColor = (index: number) => {
    setSelectedColor((prevSelectedColor) => (prevSelectedColor === index ? -1 : index));
    const selectedColorText = ColorEllipse[index]?.color || '';
    onChange('색상', selectedColorText);
  };

  return (
    <StyledContainer>
      {ColorEllipse.map((val) => (
        <StyledButton key={val.id} onClick={() => toggleSelectedColor(val.id)}>
          {selectedColor === val.id && <StyledCheckImage src={Check} alt="체크" />}
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
`;

const StyledImage = styled(Image)`
  ${onMobile} {
    width: 28px;
    height: 28px;
  }
`;
