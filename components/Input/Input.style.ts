import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import styled from 'styled-components';

export const StyledInputContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledInput = styled.input<{ $error: boolean }>`
  width: 100%;
  padding: 15px 16px;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? COLORS.RED_D6 : COLORS.GRAY_D9)};
  background-color: ${COLORS.WHITE_FF};
  color: ${COLORS.BLACK_33};
  ${fontStyle(16, 400)}

  &:hover,
  &:focus,
  &:active {
    border: 1px solid ${({ $error }) => ($error ? COLORS.RED_D6 : COLORS.VIOLET_55)};
    color: ${COLORS.BLACK_33};
    outline: none;
  }

  &:disabled {
    color: ${COLORS.GRAY_9F};
    border: 1px solid ${COLORS.GRAY_D9};
    background: ${COLORS.WHITE_FF};
  }

  ${onMobile} {
    padding: 13px 16px;
  }
`;

export const StyledLabel = styled.h5`
  color: var(--input-label);
  margin-bottom: 10px;
  display: flex;
  ${fontStyle(18, 500)};

  ${onMobile} {
    font-size: 1.6rem;
  }
`;

export const StyledErrorText = styled.p`
  color: ${COLORS.RED_D6};
  margin-top: 8px;
  ${fontStyle(14, 400)};
`;

export const StyledImage = styled(Image)`
  border: none;
`;

export const StyledButton = styled.button`
  position: absolute;
  right: 16px;
  top: 41px;
  border: none;
  background: none;
`;

export const VioletStar = styled.span`
  color: ${COLORS.VIOLET_55};
  margin-left: 3px;
  ${fontStyle(18, 500)};
`;
