import logoImage from '@/public/assets/icons/logoImage.svg'
import logoText from '@/public/assets/icons/logoText.svg'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery'
import { fontStyle } from '@/styles/fontStyle'
import sunIcon from '@/public/assets/icons/sun.svg';
import moonIcon from '@/public/assets/icons/moon.svg';
import useTheme from '@/hooks/useTheme';

function Nav() {
  const { themeMode, toggleThemeMode } = useTheme();

  return (
    <StyledLandingHeaderContainer>
      <StyledLandingHeaderInner>
        <StyledLogoLinkContainer href="/">
          <StyledLogoImageWrapper>
            <Image src={logoImage} fill alt="logoImage" />
          </StyledLogoImageWrapper>
          <StyledLogoTextWrapper>
            <Image src={logoText} fill alt="logoText" />
          </StyledLogoTextWrapper>
        </StyledLogoLinkContainer>
        <StyledLinkButton>
          <div onClick={() => toggleThemeMode()}>
            {themeMode === 'dark' ? (
              <StyledThemeModeIcon src={sunIcon} width={20} height={20} alt="라이트 모드로 변경"/>
            ) : (
              <StyledThemeModeIcon src={moonIcon} width={20} height={20} alt="다크 모드로 변경"/>
            )}
          </div>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </StyledLinkButton>
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

const StyledLogoImageWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 27px;

  ${onTablet} {
    width: 28px;
    height: 33px;
  }
`

const StyledLogoTextWrapper = styled.div`
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

const StyledLinkButton = styled.div`
  display: flex;
  gap: 20px;
  color: var(--text-main);
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
    margin-top: 1.5px;
  }
`;
