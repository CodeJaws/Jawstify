import logoImage from '@/public/assets/icons/logoImage.svg'
import logoText from '@/public/assets/icons/logoText.svg'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { COLORS } from '@/styles/palettes'
import { onPc, onTablet } from '@/styles/mediaQuery'
import { fontStyle } from '@/styles/fontStyle'

function Nav() {
  return (
    <StyledLandingHeaderContainer>
      <StyledLandingHeaderInner>
        <StyledLogoContainer href="/">
          <LogoImageWrapper>
            <Image src={logoImage} fill alt="logoImage" />
          </LogoImageWrapper>
          <LogoTextWrapper>
            <Image src={logoText} fill alt="logoText" />
          </LogoTextWrapper>
        </StyledLogoContainer>
        <LinkButton>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </LinkButton>
      </StyledLandingHeaderInner>
    </StyledLandingHeaderContainer>
  )
}

export default Nav

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

const StyledLogoContainer = styled(Link)`
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

  ${onPc} {
    display: block;
  }

  ${onTablet} {
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