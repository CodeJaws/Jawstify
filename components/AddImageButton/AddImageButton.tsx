import Add from '@/public/assets/icons/Add.svg';
import Edit from '@/public/assets/icons/EditImage.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';

interface Props {
  type: 'modal' | 'profile';
}

function AddImageButton({ type }: Props) {
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
    <StyledContainer $type={type}>
      <StyledLabel $type={type}>{type === 'modal' ? '이미지' : '프로필'}</StyledLabel>
      <StyledAddButton $type={type} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {!image && (
          <label>
            <input type="file" onChange={handleImageSelect} />
            <StyledAddImage width={28} height={28} src={Add} alt="이미지 추가 버튼" />
          </label>
        )}
        {image && (
          <label>
            {isHovered && <StyledEditButton type="file" onChange={handleImageSelect} />}
            <StyledEditCover $type={type} $isHovered={isHovered}>
              {isHovered && <StyledEditImage $type={type} width={30} height={30} src={Edit} alt="이미지 수정 버튼" />}
            </StyledEditCover>
            <StyledSelectImage $type={type} width={76} height={76} src={image as string} alt="이미지 미리보기" />
          </label>
        )}
      </StyledAddButton>
    </StyledContainer>
  );
}

export default AddImageButton;

const StyledContainer = styled.div<{ $type: string }>`
  display: flex;
  flex-direction: column;

  ${({ $type }) =>
    $type === 'modal'
      ? css`
          gap: 10px;
        `
      : css`
          gap: 32px;
          ${onMobile} {
            gap: 24px;
          }
        `}
`;

const StyledLabel = styled.p<{ $type: string }>`
  ${({ $type }) =>
    $type === 'modal'
      ? css`
          ${fontStyle(18, 500)}
        `
      : css`
          ${fontStyle(24, 700)}
        `}
`;

const StyledAddButton = styled.div<{ $type: string }>`
  display: flex;
  position: relative;
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

  ${({ $type }) =>
    $type === 'modal'
      ? css`
          width: 76px;
          height: 76px;
          ${onMobile} {
            width: 58px;
            height: 58px;
          }
        `
      : css`
          width: 182px;
          height: 182px;
          ${onMobile} {
            width: 100px;
            height: 100px;
          }
        `}
`;

const StyledAddImage = styled(Image)`
  cursor: pointer;
`;

const StyledSelectImage = styled(Image)<{ $type: string }>`
  border-radius: 6px;

  ${({ $type }) =>
    $type === 'modal'
      ? css`
          width: 76px;
          height: 76px;
          ${onMobile} {
            width: 58px;
            height: 58px;
          }
        `
      : css`
          width: 182px;
          height: 182px;
          ${onMobile} {
            width: 100px;
            height: 100px;
          }
        `}
`;

const StyledEditCover = styled.div<{ $type: string; $isHovered: boolean }>`
  position: absolute;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out;
  background-color: ${({ $isHovered }) => ($isHovered ? 'rgba(0, 0, 0, 0.6)' : 'transparent')};

  ${({ $type }) =>
    $type === 'modal'
      ? css`
          width: 76px;
          height: 76px;
          ${onMobile} {
            width: 58px;
            height: 58px;
          }
        `
      : css`
          width: 182px;
          height: 182px;
          ${onMobile} {
            width: 100px;
            height: 100px;
          }
        `}
`;

const StyledEditImage = styled(Image)<{ $type: string }>`
  position: absolute;

  ${({ $type }) =>
    $type === 'modal'
      ? css`
          left: 22px;
          bottom: 22px;
          ${onMobile} {
            width: 22px;
            height: 22px;
            left: 18px;
            bottom: 18px;
          }
        `
      : css`
          left: 60px;
          bottom: 65px;
          width: 60px;
          height: 60px;
          ${onMobile} {
            left: 32px;
            bottom: 32px;
            width: 40px;
            height: 40px;
          }
        `}
`;

const StyledEditButton = styled.input`
  cursor: pointer;
`;
