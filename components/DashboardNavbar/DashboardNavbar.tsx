import Image from 'next/image';
import styled from 'styled-components';

import crown from '@/public/assets/icons/crown.svg';
import invite from '@/public/assets/icons/invite.svg';
import setting from '@/public/assets/icons/setting.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';

import { COLORS } from '@/styles/palettes';
import Button from './Button';
import Members from './Members';
import Profile from './Profile';
import { MemberType } from './Members';
import { GetDashboardDetailedItem } from '@/types/api';
import Link from 'next/link';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import API from '@/apis/api';
import { INVITE_ERROR } from '@/constants/Modal';

interface DashboardNavbarProps {
  members: MemberType[];
  totalMembers: number;
  dashboard: GetDashboardDetailedItem;
  isMyDashboard: boolean;
}

/**
 * 대시보드의 Navbar Component
 * @param {boolean} isMyDashboard 자신의 대시보드(내 대시보드)인지 확인
 * @param {boolean} isOwner 자신이 작성한 대시보드인지 확인
 * @param {string} title 대시보드 이름
 */
function DashboardNavbar({ members, totalMembers, isMyDashboard, dashboard }: DashboardNavbarProps) {
  const dashboardTitle = isMyDashboard ? '내 대시보드' : dashboard.title;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const setModalValue = (values: any) => setEmail(values['이메일']);

  const inviteFetch = async () => {
    try {
      const res = await API.dashboard.inviteDashboard({
        dashboardId: String(dashboard.id),
        email,
      });
      console.log(res);
    } catch (e: any) {
      switch (e.data.message) {
        case INVITE_ERROR.EMAIL_ERROR:
          alert(INVITE_ERROR.EMAIL_ERROR);
          break;
        case INVITE_ERROR.INVITE_AUTH_ERROR:
          alert(INVITE_ERROR.INVITE_AUTH_ERROR);
          break;
        case INVITE_ERROR.NO_DASHBOARD_ERROR:
          alert(INVITE_ERROR.NO_DASHBOARD_ERROR);
          break;
        case INVITE_ERROR.NO_USER_ERROR:
          alert(INVITE_ERROR.NO_USER_ERROR);
          break;
        case INVITE_ERROR.ALREADY_INVITE_ERROR:
          alert(INVITE_ERROR.ALREADY_INVITE_ERROR);
          break;
        default:
          alert(e.data.message);
      }
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
        {!isMyDashboard && dashboard.createdByMe && <Image width={21} height={16} src={crown} alt="본인 계정" />}
      </StyledTitleContainer>
      <StyledWrapper>
        {!isMyDashboard ? (
          <>
            <StyledButtonWrapper>
              {dashboard.createdByMe && (
                <Link href={`/dashboard/${dashboard.id}/edit`}>
                  <Button imageUrl={setting} altText="관리">
                    관리
                  </Button>
                </Link>
              )}
              <Button imageUrl={invite} altText="초대하기" onClick={() => setIsModalOpen(true)}>
                초대하기
              </Button>
            </StyledButtonWrapper>
            <Members members={members} totalMembers={totalMembers} />
            <StyledSeperatorWrapper></StyledSeperatorWrapper>
          </>
        ) : null}
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
    color: ${COLORS.BLACK_33};
    ${fontStyle(20, 700)}
  }
`;

/** 구분좌 */
const StyledContainer = styled.div<{ $isMyDashboard: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLORS.GRAY_D9};
  background-color: ${COLORS.WHITE_FF};
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

const StyledSeperatorWrapper = styled.div`
  position: relative;
  height: 38px;
  flex-shrink: 0;
  border: 1px solid var(--gray-gray_D9D9D9, #d9d9d9);
  margin-left: 32px;

  ${onPc} {
    margin-right: 32px;
  }
  ${onTablet} {
    margin-right: 24px;
  }
  ${onMobile} {
    margin-right: 12px;
  }
`;
