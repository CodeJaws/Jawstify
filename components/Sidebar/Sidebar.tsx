import API from '@/apis/api';
import Modal from '@/components/Modal/Modal';
import Logo from '@/public/assets/icons/LogoSidebar.svg';
import LogoTitle from '@/public/assets/icons/LogoSidebarTitle.svg';
import AddBox from '@/public/assets/icons/invite.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';

/** 대시보드 목록 조회를 통해 얻은 대시보드들의 정보들 */

interface SidebarProps {
  boardId?: number;
  reset?: boolean;
  setReset?: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ reset, boardId, setReset }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    '대시보드 이름': '',
    색상: '',
  });

  const setModalValue = (
    values = {
      '대시보드 이름': '',
      색상: '',
    },
  ) => {
    setValues(values);
  };

  const handleCreate = async () => {
    await API.dashboard.createDashboard({ title: values['대시보드 이름'], color: values.색상 });
    if (setReset) {
      setReset((prev) => !prev);
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledImageWrapper>
          <Link href="/mydashboard">
            <StyledImage src={Logo} alt="사이드바 로고" />
            <StyledImage src={LogoTitle} alt="사이드바 로고 제목" />
          </Link>
        </StyledImageWrapper>

        <StyledTitleWrapper
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <h3>Dash Boards</h3>
          <button>
            <Image width={20} height={20} src={AddBox} alt="추가하기" />
          </button>
        </StyledTitleWrapper>
        <Dashboard reset={reset} boardId={boardId} />
      </StyledContainer>
      {isOpen && (
        <Modal
          title="새로운 대시보드"
          getValue={setModalValue}
          onCancelClick={() => {
            setIsOpen(false);
          }}
          onOkClick={() => {
            handleCreate();
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}

export default Sidebar;

const StyledContainer = styled.div`
  position: fixed;
  z-index: 7;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 1080px;
  flex-shrink: 0;
  background: ${COLORS.WHITE_FF};
  border: 1px solid ${COLORS.GRAY_D9};
  ${onPc} {
    width: 300px;
  }

  ${onTablet} {
    width: 160px;
  }

  ${onMobile} {
    width: 67px;
    align-items: center;
  }
`;

const StyledImage = styled(Image)`
  &:nth-child(2) {
    margin-top: 8.01px;
    ${onMobile} {
      display: none;
    }
  }
`;

const StyledImageWrapper = styled.div`
  display: flex;
  margin-top: 20px;

  ${onPc} {
    margin-left: 24px;
  }

  ${onTablet} {
    margin-left: 26px;
  }
`;

const StyledTitleWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    color: ${COLORS.GRAY_78};
    ${fontStyle(12, 700)};
  }

  button {
    &:hover {
      transform: scale(1.1);
    }
  }

  ${onPc} {
    margin: 59.93px 24px 18px;
  }

  ${onTablet} {
    margin: 59.93px 30px 18px 24px;
    width: 116px;
  }

  ${onMobile} {
    margin-top: 38.87px;
    h3 {
      display: none;
    }
  }
`;
