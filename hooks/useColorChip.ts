import { ColorChipProps } from '@/components/Chip/ColorChip';
import Blue from '@/public/assets/icons/BlueEllipse.svg';
import Green from '@/public/assets/icons/GreenEllipse.svg';
import Orange from '@/public/assets/icons/OrangeEllipse.svg';
import Pink from '@/public/assets/icons/PinkEllipse.svg';
import Purple from '@/public/assets/icons/PurpleEllipse.svg';
import { COLORS } from '@/styles/palettes';
import { useEffect, useState } from 'react';

export const ColorEllipse = [
  { id: 0, src: Green, alt: '녹색 원', color: COLORS.GREEN_7A },
  { id: 1, src: Purple, alt: '보라색 원', color: COLORS.PURPLE_76 },
  { id: 2, src: Orange, alt: '오렌지 원', color: COLORS.ORANGE_FF },
  { id: 3, src: Blue, alt: '하늘색 원', color: COLORS.BLUE_76 },
  { id: 4, src: Pink, alt: '핑크색 원', color: COLORS.PINK_E8 },
];

function useColorChip({ onChange, color }: ColorChipProps) {
  const [selectedColor, setSelectedColor] = useState(0);

  const toggleSelectedColor = (index: number) => {
    setSelectedColor((prevSelectedColor) => (prevSelectedColor === index ? -1 : index));
    const selectedColorText = ColorEllipse[index]?.color || '';
    onChange('색상', selectedColorText);
  };

  useEffect(() => {
    setSelectedColor((ColorEllipse.find((x) => x.color === color)?.id as number) ?? 0);
  }, [color]);

  return { selectedColor, toggleSelectedColor };
}

export default useColorChip;
