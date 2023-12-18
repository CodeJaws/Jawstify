import { fontStyle } from '@/styles/fontStyle'
import { ChangeEvent, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { COLORS } from '@/styles/palettes'

interface Props {
  isError: boolean
  placeholder?: string
  errorMessage?: string
  label?: string
  inputValue?: string
  type?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
function Input({ isError: error, placeholder, errorMessage = '', label = '로그인', inputValue, onChange }: Props) {
  const [isNoVal, setIsNoVal] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState('')

  const handleVisibility = () => setIsVisible((prev) => !prev)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const blurHandler = () => {
    console.log(!value)
    console.log(!errorMessage)
    !value ? setIsNoVal(true) : setIsNoVal(false)
  }

  return (
    <StyledInputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInputWrapper
        type={isVisible ? 'text' : 'password'}
        error={isNoVal || Boolean(errorMessage)}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {(isNoVal || errorMessage) && <StyledErrorText>{errorMessage || '값을 입력해 주세요'}</StyledErrorText>}
    </StyledInputContainer>
  )
}

export default Input

const StyledInputContainer = styled.div`
  width: 100%;
`

const StyledInputWrapper = styled.input<{ error: boolean }>`
  width: 100%;
  padding: 15px 16px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? COLORS.RED : COLORS.BLACK_200)};
  background-color: ${COLORS.WHITE};
  color: #000;
  ${fontStyle(16, 400)}

  &:focus,
  &:active {
    border-color: ${COLORS.VIOLET};
    color: ${COLORS.BLACK_200};
    outline: none;
  }

  &:hover {
    border-color: ${({ error }) => (error ? COLORS.RED : COLORS.VIOLET)};
    color: ${COLORS.BLACK_200};
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
  ${fontStyle(16, 400)};
`

const StyledErrorText = styled.p`
  color: ${COLORS.RED};
  margin-top: 8px;
  ${fontStyle(14, 400)};
`
