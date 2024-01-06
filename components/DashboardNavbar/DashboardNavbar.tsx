import API from '@/apis/api';
import Button from '@/components/DashboardNavbar/Button';
import DarkModeToggleButton from '@/components/DashboardNavbar/DarkModeToggleButton';
import Members, { MemberType } from '@/components/DashboardNavbar/Members';
import Profile from '@/components/DashboardNavbar/Profile';
import Modal from '@/components/Modal/Modal';
import {
  ALREADY_INVITE_ERROR,
  INVALID_EMAIL_ERROR,
  INVITE_AUTH_ERROR,
  NO_DASHBOARD_ERROR,
  NO_USER_ERROR,
} from '@/constants/ApiError';
import crown from '@/public/assets/icons/crown.svg';
import invite from '@/public/assets/icons/invite.svg';
import setting from '@/public/assets/icons/setting.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { GetDashboardDetailedItem } from '@/types/api';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

interface DashboardNavbarProps {
  members?: MemberType[];
  totalMembers?: number;
  dashboard?: GetDashboardDetailedItem;
  isMyDashboard: boolean;
  refreshInvite?: () => void;
}

function DashboardNavbar({ members, totalMembers, isMyDashboard, dashboard, refreshInvite }: DashboardNavbarProps) {
  const router = useRouter();
  const dashboardTitle = isMyDashboard
    ? '내 대시보드'
    : router.pathname === '/mypage'
      ? '계정관리'
      : dashboard
        ? dashboard.title
        : '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const setModalValue = (values: any) => setEmail(values['이메일']);

  const inviteFetch = async () => {
    if (!dashboard) return;

    try {
      const { invitations } = await API.dashboard.loadInviteDashboard({
        dashboardId: Number(dashboard.id),
        size: 100,
      });
      for (let i = 0; i < invitations.length; i++) {
        if (email === invitations[i].invitee.email) {
          alert(ALREADY_INVITE_ERROR);
          return;
        }
      }
    } catch (e: any) {
      alert(e.data.message);
      return;
    }

    try {
      await API.dashboard.inviteDashboard({
        dashboardId: Number(dashboard.id),
        email,
      });
      if (refreshInvite) {
        refreshInvite();
      }

      alert('성공적으로 초대하기 메세지를 보냈습니다.');
    } catch (e: any) {
      switch (e.data.message) {
        case INVALID_EMAIL_ERROR:
          alert(INVALID_EMAIL_ERROR);
          break;
        case INVITE_AUTH_ERROR:
          alert(INVITE_AUTH_ERROR);
          break;
        case NO_DASHBOARD_ERROR:
          alert(NO_DASHBOARD_ERROR);
          break;
        case NO_USER_ERROR:
          alert(NO_USER_ERROR);
          break;
        case ALREADY_INVITE_ERROR:
          alert(ALREADY_INVITE_ERROR);
          break;
        default:
          alert(e.data.message);
      }
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <StyledContainer $isMyDashboard={isMyDashboard}>
      {isModalOpen && (
        <Modal
          title="초대하기"
          getValue={setModalValue}
          onCancelClick={() => setIsModalOpen(false)}
          onOkClick={() => {
            inviteFetch();
          }}
        />
      )}
      <StyledTitleContainer>
        <h3>{dashboardTitle}</h3>
        {!isMyDashboard && dashboard && dashboard.createdByMe && (
          <Image width={21} height={16} src={crown} sizes="100%" alt="본인 계정" />
        )}
      </StyledTitleContainer>
      <StyledWrapper>
        {!isMyDashboard && dashboardTitle !== '계정관리' ? (
          <>
            <StyledButtonWrapper>
              {dashboard && dashboard.createdByMe && (
                <Link href={`/${dashboard.id}/edit`}>
                  <Button imageUrl={setting} altText="관리">
                    관리
                  </Button>
                </Link>
              )}
              <Button imageUrl={invite} altText="초대하기" onClick={() => setIsModalOpen(true)}>
                초대하기
              </Button>
            </StyledButtonWrapper>
            {members && totalMembers ? <Members members={members} totalMembers={totalMembers} /> : null}
            <StyledSeparatorWrapper />
          </>
        ) : null}
        <DarkModeToggleButton />
        <Profile />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default DashboardNavbar;

const StyledTitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 340px;

  ${onTablet} {
    margin-left: 200px;
  }

  ${onMobile} {
    margin-left: 91px;

    h3 {
      ${fontStyle(18, 700)}
    }
  }

  h3 {
    color: var(--content-main);
    ${fontStyle(20, 700)}
  }
`;

const StyledContainer = styled.div<{ $isMyDashboard: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: var(--nav-border);
  background-color: var(--nav-bg);
  z-index: 2;
  justify-content: ${({ $isMyDashboard }) => ($isMyDashboard ? 'space-between' : 'flex-end')};

  ${onPc} {
    justify-content: space-between;
  }

  ${onTablet} {
    ${StyledTitleContainer} {
      display: ${({ $isMyDashboard }) => ($isMyDashboard === false ? 'none' : 'block')};
    }
  }
  ${onMobile} {
    ${StyledTitleContainer} {
      display: ${({ $isMyDashboard }) => ($isMyDashboard === false ? 'none' : 'block')};
    }
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${onPc} {
    gap: 16px;
  }

  ${onTablet} {
    gap: 12px;
  }

  ${onMobile} {
    gap: 6px;
  }
`;

const StyledSeparatorWrapper = styled.div`
  position: relative;
  height: 38px;
  flex-shrink: 0;
  border: var(--content-divider);
  margin-left: 32px;

  ${onPc} {
    margin-right: 23px;
  }

  ${onTablet} {
    margin-right: 24px;
  }

  ${onMobile} {
    margin-right: 12px;
  }
`;
