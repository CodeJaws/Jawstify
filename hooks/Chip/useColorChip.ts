import { ColorChipProps } from '@/components/Chip/ColorChip';
import { ColorEllipse } from '@/constants/ColorEllipse';

import { useEffect, useState } from 'react';

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
