import Add from '@/public/assets/icons/Add.svg';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { styled } from 'styled-components';

interface AddChipProps {
  size: string;
}

function AddChip({ size }: AddChipProps) {
  const selectSize = (size: string) => {
    switch (size) {
      case 'large':
        return { imgSize: 16, divSize: 22 };
      case 'small':
        return { imgSize: 14, divSize: 20 };
      default:
        return { imgSize: 16, divSize: 22 };
    }
  };
  const { imgSize, divSize } = selectSize(size);
  return (
    <StyledContainer size={divSize}>
      <Image width={imgSize} height={imgSize} src={Add} alt="추가 버튼" />
    </StyledContainer>
  );
}

export default AddChip;

const StyledContainer = styled.button<{ size: number }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  padding: 3px;
  border-radius: 4px;
  background-color: ${COLORS.VIOLET_LIGHT};
`;
