import { fontStyle } from '@/styles/fontStyle'
import { ChangeEvent, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { COLORS } from '@/styles/palettes'
import Image from 'next/image'
import eyeOn from '@/public/assets/images/eyeon.svg'
import eyeOff from '@/public/assets/images/eyeoff.svg'

interface Props {
  isError: boolean
  placeholder?: string
  errorMessage?: string
  label?: string
  inputValue?: string
  type?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
function Input({ isError: error, placeholder, errorMessage = '', label = '', inputValue, onChange }: Props) {
  const [isNoVal, setIsNoVal] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState(true)
  const [value, setValue] = useState('')

  const isPassword = label === '비밀번호'

  const handleVisibility = () => setIsVisible((prev) => !prev)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    !value ? setIsNoVal(true) : setIsNoVal(false)
  }

  const blurHandler = () => {
    !value ? setIsNoVal(true) : setIsNoVal(false)
  }

  return (
    <StyledInputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={isVisible ? 'text' : 'password'}
        error={isNoVal || Boolean(errorMessage)}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {isPassword && (
        <StyledButton onClick={handleVisibility} type="button">
          <StyledImage src={isVisible ? eyeOn : eyeOff} width={24} height={24} alt="비밀번호 숨기기" />
        </StyledButton>
      )}
      {(isNoVal || errorMessage) && <StyledErrorText>{errorMessage || '값을 입력해 주세요'}</StyledErrorText>}
    </StyledInputContainer>
  )
}

export default Input

const StyledInputContainer = styled.div`
  width: 100%;
`

const StyledInput = styled.input<{ error: boolean }>`
  width: 100%;
  padding: 15px 16px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? COLORS.RED : COLORS.BLACK_200)};
  background-color: ${COLORS.WHITE};

  color: ${COLORS.BLACK_200};
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

const StyledImage = styled(Image)`
  border: none;
`

const StyledButton = styled.button`
  position: absolute;
  right: 16px;
  top: 41px;
  border: none;
  background: none;
`
