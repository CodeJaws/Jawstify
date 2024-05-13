import API from '@/apis/api';
import Modal from '@/components/Modal/Modal';
import Dashboard from '@/components/Sidebar/Dashboard';
import { INIT_CREATE_DASHBOARD } from '@/constants/InitialModalValues';
import AddBox from '@/public/assets/icons/invite.svg';
import LogoTitle from '@/public/assets/images/title.avif';
import Logo from '@/public/assets/images/transJaws.avif';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

interface SidebarProps {
  boardId?: number;
  refreshToggle?: boolean;
  refresh?: () => void;
}

function Sidebar({ boardId, refreshToggle, refresh }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(INIT_CREATE_DASHBOARD);

  const setModalValue = (values = INIT_CREATE_DASHBOARD) => {
    setValues(values);
  };

  const handleCreate = async () => {
    await API.dashboard.createDashboard({ title: values['대시보드 이름'], color: values.색상 });
    if (refresh) {
      refresh();
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledImageWrapper>
          <Link href="/mydashboard">
            <StyledImage width={30} height={30} src={Logo} alt="사이드바 로고" />
            <StyledImage width={95} height={22} src={LogoTitle} alt="사이드바 로고 제목" />
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
        <Dashboard boardId={boardId} refreshToggle={refreshToggle} refresh={refresh} />
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

const StyledContainer = styled.aside`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 1080px;
  flex-shrink: 0;
  background: var(--sidebar-bg);
  border-right: var(--sidebar-border);

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
    margin-bottom: 2px;

    ${onMobile} {
      display: none;
    }
  }
`;

const StyledImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  ${onPc} {
    margin-left: 24px;
  }

  ${onTablet} {
    margin-left: 14px;
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
