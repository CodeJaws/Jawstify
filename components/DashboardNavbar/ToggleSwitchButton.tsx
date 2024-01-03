import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/styles/palettes';
import useTheme from '@/hooks/useTheme';

function ToggleSwitchButton() {
  const { themeMode, toggleThemeMode } = useTheme();

  const [checked, setChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev);
  }

  return (
    <StyledLabel onClick={() => toggleThemeMode()}>
      <StyledInput checked={checked} type='checkbox' onChange={handleChange} />
      <StyledSwitch />
    </StyledLabel>
  );
}

export default ToggleSwitchButton;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const StyledSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 32px;
  background-color: #b3b3b3;
  border-radius: 28px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    top: 50%;
    left: 4px;
    background-color: white;
    transform: translate(0, -50%);
    transition: 300ms all;
  }
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
  display: none;

  &:checked + ${StyledSwitch} {
    background-color: ${COLORS.VIOLET_15};

    &:before {
      transform: translate(26px, -50%);
    }
  }
`;
