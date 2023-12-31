import logoImage from '@/public/assets/icons/logoImage.svg'
import logoText from '@/public/assets/icons/logoText.svg'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { COLORS } from '@/styles/palettes'
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery'
import { fontStyle } from '@/styles/fontStyle'
import { EventHandler, MouseEventHandler, useState } from 'react'
import sunIcon from '@/public/assets/icons/sun.svg';
import moonIcon from '@/public/assets/icons/moon.svg';

type ThemeKey = 'light' | 'dark';

function Nav() {
  const [themeMode, setThemeMode] = useState<ThemeKey>('light');

  const handleThemeMode = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  }

  return (
    <StyledLandingHeaderContainer>
      <StyledLandingHeaderInner>
        <StyledLogoLinkContainer href="/">
          <LogoImageWrapper>
            <Image src={logoImage} fill alt="logoImage" />
          </LogoImageWrapper>
          <LogoTextWrapper>
            <Image src={logoText} fill alt="logoText" />
          </LogoTextWrapper>
        </StyledLogoLinkContainer>
        <LinkButton>
          <div onClick={handleThemeMode}>
            {themeMode === 'dark' ? (
              <StyledThemeModeIcon src={sunIcon} width={20} height={20} alt="라이트 모드로 변경"/>
            ) : (
              <StyledThemeModeIcon src={moonIcon} width={20} height={20} alt="다크 모드로 변경"/>
            )}
          </div>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </LinkButton>
      </StyledLandingHeaderInner>
    </StyledLandingHeaderContainer>
  )
}

export default Nav;

const StyledLandingHeaderContainer = styled.div`
  width: 100%;
  padding: 22px 24px;

  ${onTablet} {
    padding: 26px 40px;
  }

  ${onPc} {
    padding: 26px 80px;
  }
`

const StyledLandingHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const StyledLogoLinkContainer = styled(Link)`
  display: flex;
  align-items: center;
`

const LogoImageWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 27px;

  ${onTablet} {
    width: 28px;
    height: 33px;
  }
`

const LogoTextWrapper = styled.div`
  display: none;
  position: relative;
  width: 80px;
  height: 22px;

  ${onTablet} {
    display: block;
  }
  
  ${onPc} {
    display: block;
  }

`

const LinkButton = styled.div`
  display: flex;
  gap: 20px;
  color: ${COLORS.BLACK_17};
  ${fontStyle(14, 400)};

  ${onTablet} {
    ${fontStyle(16, 400)};
  }

  ${onPc} {
    ${fontStyle(16, 400)};
  }
`
const StyledThemeModeIcon = styled(Image)`
  cursor: pointer;

  ${onMobile} {
    width: 14px;
    height: 14px;
  }
`;
