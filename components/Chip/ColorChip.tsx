import Check from '@/public/assets/icons/Check.svg';
import Green from '@/public/assets/icons/GreenEllipse.svg';
import Orange from '@/public/assets/icons/OrangeEllipse.svg';
import Pink from '@/public/assets/icons/PinkEllipse.svg';
import Purple from '@/public/assets/icons/PurpleEllipse.svg';
import SkyBlue from '@/public/assets/icons/SkyBlueEllipse.svg';
import Image from 'next/image';
import { useState } from 'react';
import { styled } from 'styled-components';

const ColorEllipse = [
  { src: Green, alt: '녹색 원' },
  { src: Purple, alt: '보라색 원' },
  { src: Orange, alt: '오렌지 원' },
  { src: SkyBlue, alt: '하늘색 원' },
  { src: Pink, alt: '핑크색 원' },
];

function ColorChip() {
  const [selectedColor, setSelectedColor] = useState(0);

  const toggleSelectedColor = (index: number) => {
    setSelectedColor((prevSelectedColor) => (prevSelectedColor === index ? -1 : index));
  };

  return (
    <StyledContainer>
      {ColorEllipse.map((val, index) => (
        <StyledButton key={index} onClick={() => toggleSelectedColor(index)}>
          {selectedColor === index && <StyledCheckImage src={Check} alt="체크" />}
          <Image width={30} height={30} src={val.src} alt={val.alt} />
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
  gap: 10px;
`;

const StyledButton = styled.button`
  all: unset;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCheckImage = styled(Image)`
  position: absolute;
`;
