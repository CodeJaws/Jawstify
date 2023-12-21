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

  const handleImageSelect = (e?: ChangeEvent<HTMLInputElement> | undefined) => {
    const file = e?.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
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
      <StyledAddButton $type={type}>
        {!image ? (
          <label>
            <input type="file" onChange={handleImageSelect} />
            <StyledAddImage width={28} height={28} src={Add} alt="이미지 추가 버튼" />
          </label>
        ) : (
          <label>
            <StyledEditButton type="file" onChange={handleImageSelect} />
            <StyledEditCover $type={type}>
              <StyledEditImage $type={type} width={30} height={30} src={Edit} alt="이미지 수정 버튼" />
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
  gap: 10px;

  ${({ $type }) =>
    $type === 'profile' &&
    css`
      gap: 32px;
      ${onMobile} {
        gap: 24px;
      }
    `}
`;

const StyledLabel = styled.p<{ $type: string }>`
  ${fontStyle(18, 500)}
  ${({ $type }) =>
    $type === 'profile' &&
    css`
      ${fontStyle(24, 700)}
    `}
`;

const StyledEditImage = styled(Image)<{ $type: string }>`
  position: absolute;
  left: 22px;
  bottom: 22px;
  ${onMobile} {
    width: 22px;
    height: 22px;
    left: 18px;
    bottom: 18px;
  }

  ${({ $type }) =>
    $type === 'profile' &&
    css`
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
  visibility: hidden;
`;

const StyledEditCover = styled.div<{ $type: string }>`
  width: 76px;
  height: 76px;
  position: absolute;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out;
  background-color: transparent;

  ${onMobile} {
    width: 58px;
    height: 58px;
  }
  ${({ $type }) =>
    $type === 'profile' &&
    css`
      width: 182px;
      height: 182px;
      ${onMobile} {
        width: 100px;
        height: 100px;
      }
    `}
`;

const StyledAddButton = styled.div<{ $type: string }>`
  width: 76px;
  height: 76px;
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
  ${StyledEditImage} {
    display: none;
  }

  &:hover {
    ${StyledEditImage} {
      display: block;
    }
    ${StyledEditCover} {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  ${onMobile} {
    width: 58px;
    height: 58px;
  }

  ${({ $type }) =>
    $type === 'profile' &&
    css`
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
  width: 76px;
  height: 76px;
  border-radius: 6px;

  ${onMobile} {
    width: 58px;
    height: 58px;
  }

  ${({ $type }) =>
    $type === 'profile' &&
    css`
      width: 182px;
      height: 182px;
      ${onMobile} {
        width: 100px;
        height: 100px;
      }
    `}
`;
