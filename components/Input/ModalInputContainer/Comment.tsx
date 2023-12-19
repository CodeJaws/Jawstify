import { fontStyle } from '@/styles/fontStyle'
import { ChangeEvent, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { COLORS } from '@/styles/palettes'
import Image from 'next/image'
import { DEFAULT_PLACEHOLDER } from '@/constants/Input'

const INPUT_TYPE = {
  COMMENT: '댓글',
  TITLE: '제목',
  DATE: '마감일',
  TAG: '태그',
}

interface Props {
  isError: boolean
  errorMessage?: string
  label?: string
  inputValue?: string
  type?: string
  isNecessary?: boolean
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
function ModalInput({ isError: error, errorMessage = '', label = '', inputValue, isNecessary, onChange }: Props) {
  const [errorMsg, setErrorMsg] = useState('')
  const [isNoVal, setIsNoVal] = useState<boolean>(false)
  const [value, setValue] = useState('')

  const isComment = label === '댓글'
  const isTitle = label === '제목'
  const isDate = label === '마감일'
  const isTag = label === '태그'

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    !value ? setIsNoVal(true) : setIsNoVal(false)
    // handleErrorState(e.target.value, isPassword)
  }

  const handleErrorState = (inputValue: string, isPassword: boolean) => {}

  const handleBlur = () => {
    !value ? setIsNoVal(true) : setIsNoVal(false)
  }

  return (
    <StyledInputContainer>
      <StyledLabel>
        {label}
        {isNecessary && <VioletStar>*</VioletStar>}
      </StyledLabel>
      <StyledInput
        error={isNoVal || Boolean(errorMsg)}
        placeholder={DEFAULT_PLACEHOLDER.COMMENT}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {(isNoVal || errorMsg) && <StyledErrorText>{errorMsg || '값을 입력해 주세요'}</StyledErrorText>}
    </StyledInputContainer>
  )
}

export default ModalInput

const StyledInputContainer = styled.div`
  width: 100%;
  position: relative;
`

const StyledInput = styled.textarea<{ error: boolean }>`
  width: 100%;
  height: 110px;
  padding: 15px 16px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? COLORS.RED : COLORS.BLACK_200)};
  background-color: ${COLORS.WHITE};

  color: ${COLORS.BLACK_200};
  ${fontStyle(16, 400)}

  &:focus,
  &:active {
    border: 1px solid ${({ error }) => (error ? COLORS.RED : COLORS.BLACK_200)};
    color: ${COLORS.BLACK_200};
    outline: none;
  }

  ${(props) =>
    props.disabled &&
    css`
      border-color: #000;
      background-color: #000;
    `}
`

const StyledLabel = styled.h5`
  color: ${COLORS.BLACK_200};
  margin-bottom: 8px;
  display: flex;
  ${fontStyle(18, 500)};
`

const StyledErrorText = styled.p`
  color: ${COLORS.RED};
  margin-top: 8px;
  ${fontStyle(14, 400)};
`

const VioletStar = styled.span`
  color: ${COLORS.VIOLET};
  margin-left: 3px;
  ${fontStyle(18, 500)};
`
