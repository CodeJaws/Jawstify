import Add from '@/public/assets/icons/Add.svg';
import Edit from '@/public/assets/icons/EditImage.svg';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { styled } from 'styled-components';

function AddImageButton() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageSelect = (e?: ChangeEvent<HTMLInputElement> | undefined) => {
    const file = e?.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setIsHovered(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    handleImageSelect();
  }, [image]);

  return (
    <StyledContainer>
      <StyledLabel>이미지</StyledLabel>
      <StyledAddButton onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {!image && (
          <label>
            <input type="file" onChange={handleImageSelect} />
            <StyledAddImage width={28} height={28} src={Add} alt="이미지 추가 버튼" />
          </label>
        )}
        {image && (
          <label>
            {isHovered && <StyledEditButton type="file" onChange={handleImageSelect} />}
            <StyledEditCover $isHovered={isHovered}>
              {isHovered && <StyledEditImage width={30} height={30} src={Edit} alt="이미지 수정 버튼" />}
            </StyledEditCover>
            <StyledSelectImage width={76} height={76} src={image as string} alt="이미지 미리보기" />
          </label>
        )}
      </StyledAddButton>
    </StyledContainer>
  );
}

export default AddImageButton;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.p`
  ${fontStyle(18, 500)}
`;

const StyledAddButton = styled.div`
  display: flex;
  position: relative;
  width: 76px;
  height: 76px;
  padding: 24px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: ${COLORS.GRAY_F5};
  cursor: pointer;

  input {
    display: none;
  }
`;

const StyledAddImage = styled(Image)`
  cursor: pointer;
`;

const StyledSelectImage = styled(Image)`
  border-radius: 6px;
`;

const StyledEditCover = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  width: 76px;
  height: 76px;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out;
  background-color: ${({ $isHovered }) => ($isHovered ? 'rgba(0, 0, 0, 0.6)' : 'transparent')};
`;

const StyledEditImage = styled(Image)`
  position: absolute;
  left: 22px;
  bottom: 22px;
`;

const StyledEditButton = styled.input`
  cursor: pointer;
`;
