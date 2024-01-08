import btn from '@/public/assets/icons/AddBoxWhite.svg';
import dark from '@/public/assets/icons/BlueEllipse.svg';
import light from '@/public/assets/icons/PurpleEllipse.svg';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

function DarkmodeButton() {
  const [isDarkmode, setIsDarkmode] = useState(false);

  const handleTheme = () => {};

  return (
    <StyledContainer $isDarkmode={isDarkmode} onClick={handleTheme}>
      {isDarkmode ? '' : <Image className="dark-icon" src={dark} alt="밝은 모드" />}
      <Image src={btn} alt="버튼" />
      {/* <Button className="button" /> */}
      {isDarkmode ? <Image className="sun-icon" src={light} alt="다크 모드" /> : ''}
    </StyledContainer>
  );
}

export default DarkmodeButton;

const StyledContainer = styled.div<{ $isDarkmode: boolean }>`
  width: 8rem;
  height: 4.1rem;
  border-radius: 4rem;
  background: ${({ $isDarkmode }) => ($isDarkmode ? '#ffc261;' : '#fff;')};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;

  svg > circle {
    fill: ${({ $isDarkmode }) => ($isDarkmode ? '#fff;' : '#000;')};
  }

  .button {
    position: absolute;
    top: 3px;
    left: ${({ $isDarkmode }) => ($isDarkmode ? '3px;' : '42px;')};
    transition: all 0.3s ease-in-out;
  }

  .dark-icon {
    position: absolute;
    top: 5px;
    left: 5px;
    visibility: ${({ $isDarkmode }) => ($isDarkmode ? 'hidden;' : 'visible;')};
    transition: all 0.3s ease-in-out;
  }

  .sun-icon {
    position: absolute;
    top: 5px;
    left: 44px;
    visibility: ${({ $isDarkmode }) => ($isDarkmode ? 'visible;' : 'hidden;')};
    transition: all 0.3s ease-in-out;
  }
`;
