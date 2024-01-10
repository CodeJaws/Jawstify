import API from '@/apis/api';
import Modal from '@/components/Modal/Modal';
import InviteButton from '@/components/Table/InviteButton';
import Button from '@/components/common/Button/Button';
import PaginationButton from '@/components/common/Button/PaginationButton';
import {
  ABORT_INVITE_AUTH_ERROR,
  ALREADY_INVITE_ERROR,
  INVALID_EMAIL_ERROR,
  INVITE_AUTH_ERROR,
  NO_DASHBOARD_ERROR,
  NO_EXIST_INVITE_ERROR,
  NO_USER_ERROR,
} from '@/constants/ApiError';
import usePagination from '@/hooks/Common/usePagination';
import NoItem from '@/public/assets/images/noItem.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { InvitationType } from '@/types/apiType';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

interface TablePaginationProps {
  dashboardId: number;
  inviteRefresh: boolean;
}

interface TableProps {
  item: InvitationType;
  dashboardId: number;
  refreshPagination: () => void;
}

const SHOW_ITEMS_SIZE = 5;

/** 초대 내역 컴포넌트에서 하나의 줄을 의미합니다. */
function Table({ item, dashboardId, refreshPagination }: TableProps) {
  const { email } = item.invitee;
  let buttonName = '취소';

  const handleDelete = async () => {
    try {
      await API.dashboard.abortInviteDashboard({ dashboardId, invitationId: Number(item.id) });
      refreshPagination();
    } catch (e: any) {
      switch (e.data.message) {
        case ABORT_INVITE_AUTH_ERROR:
          alert(ABORT_INVITE_AUTH_ERROR);
          break;
        case NO_DASHBOARD_ERROR:
          alert(NO_DASHBOARD_ERROR);
          break;
        case NO_EXIST_INVITE_ERROR:
          alert(NO_EXIST_INVITE_ERROR);
          break;
      }
    }
  };

  return (
    <StyledMemberBoxContainer>
      <StyledMemberBoxProfileWrapper>
        <p>{email}</p>
      </StyledMemberBoxProfileWrapper>
      <Button text={buttonName} isViolet={false} size="small" onClick={() => handleDelete()} className="" />
    </StyledMemberBoxContainer>
  );
}

function InviteDetailsTable({ dashboardId, inviteRefresh }: TablePaginationProps) {
  const [refreshPaginationToggle, setRefreshPaginationToggle] = useState(false);
  const refreshPagination = () => setRefreshPaginationToggle((prev) => !prev);

  /**
   * @param handlePagination 페이지네이션 OnClick 동작 함수
   * @param pageNum 현재 페이지 넘버
   * @param allItems 모든 Items
   * @param totalPages 총 페이지 수
   * @param totalCount 전체 아이템 수 - API에서 받아올 수 있습니다.
   */
  const { handlePagination, pageNum, totalPages, allItems } = usePagination({
    size: 20,
    showItemNum: SHOW_ITEMS_SIZE,
    type: 'invitationDetails',
    dashboardId,
    refreshPaginationToggle,
    inviteRefresh,
  });

  const tableTitle = '초대 내역';
  const tableSubTitle = '이메일';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const setModalValue = (values: any) => {
    setEmail(values['이메일']);
  };
  const handleInvite = async () => {
    for (let i = 0; i < allItems.length; i++) {
      const check = allItems[i];
      if ('invitee' in check && check.invitee.email === email) {
        alert('이미 초대하신 멤버입니다.');
        return;
      }
    }

    try {
      await API.dashboard.inviteDashboard({
        dashboardId: Number(dashboardId),
        email,
      });
      refreshPagination();
      alert('성공적으로 초대하기 메세지를 보냈습니다');
      setIsModalOpen(false);
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
    }
  };

  const showItems = allItems.slice((pageNum - 1) * SHOW_ITEMS_SIZE, (pageNum - 1) * SHOW_ITEMS_SIZE + SHOW_ITEMS_SIZE);
  return (
    <StyledContainer>
      {isModalOpen && (
        <Modal
          title="초대하기"
          getValue={setModalValue}
          onOkClick={handleInvite}
          onCancelClick={() => setIsModalOpen(false)}
        />
      )}
      {showItems.length > 0 ? (
        <>
          <StyledTopWrapper>
            <h1>{tableTitle}</h1>
            <StyledPaginationWrapper>
              <div>
                {totalPages} 페이지 중 {pageNum}
              </div>
              <div>
                <PaginationButton active={pageNum !== 1} direction="left" onClick={() => handlePagination(-1)} />
                <PaginationButton
                  active={pageNum !== totalPages}
                  direction="right"
                  onClick={() => handlePagination(1)}
                />
              </div>
              <InviteButton text="초대하기" onClick={() => setIsModalOpen(true)} hasItems={showItems.length !== 0} />
            </StyledPaginationWrapper>
          </StyledTopWrapper>
          <StyledNameText>{tableSubTitle}</StyledNameText>
          {showItems.map((item, index) => (
            <div key={item.id}>
              <Table
                item={item as InvitationType}
                dashboardId={Number(dashboardId)}
                refreshPagination={refreshPagination}
              />
              {showItems.length - 1 !== index && <StyledSeparator />}
            </div>
          ))}
        </>
      ) : (
        <StyledNoItemWrapper>
          <StyledNoItemTitleWrapper>
            <h1>{tableTitle}</h1>
          </StyledNoItemTitleWrapper>
          <StyledNoItemInWrapper>
            <StyledImage src={NoItem} priority alt="초대 내역 없음" />
            <p>초대 내역이 존재하지 않습니다.</p>
            <InviteButton text="초대하기" onClick={() => setIsModalOpen(true)} hasItems={showItems.length !== 0} />
          </StyledNoItemInWrapper>
        </StyledNoItemWrapper>
      )}
    </StyledContainer>
  );
}

export default InviteDetailsTable;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  flex-shrink: 0;

  height: 477px;
  border-radius: 8px;
  background-color: var(--content-color);
  margin-bottom: 40px;
  border: var(--content-border);
  color: var(--content-second) ${onTablet} {
    width: 100%;
    margin-bottom: 48px;
  }

  ${onMobile} {
    margin-bottom: 32px;
    width: 100%;
    height: 406px;
  }
`;

const StyledNameText = styled.p`
  color: var(--content-second);
  ${fontStyle(16, 400)};
  margin-left: 28px;
  margin-bottom: 24px;

  ${onMobile} {
    margin-left: 20px;
    margin-bottom: 29px;
    ${fontStyle(14, 400)}
  }
`;

const StyledTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;

  h1 {
    color: var(--content-main);
    ${fontStyle(24, 700)};
  }

  margin-top: 26px;

  ${onMobile} {
    h1 {
      ${fontStyle(20, 700)};
    }
    padding: 0 20px;
  }
`;

const StyledPaginationWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--content-main);
    ${fontStyle(14, 400)};
  }

  ${onMobile} {
    div {
      ${fontStyle(12, 400)}
    }
    gap: 12px;
  }
`;

const StyledMemberBoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  padding: 0 28px;

  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin: 16px 0;

  ${onMobile} {
    height: 34px;
    padding: 0 20px;
    margin: 12px 0;
  }
`;

const StyledMemberBoxProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    color: var(--content-main);
    ${fontStyle(16, 400)};
  }

  ${onMobile} {
    gap: 8px;
    p {
      ${fontStyle(14, 400)};
    }
  }
`;

const StyledSeparator = styled.div`
  width: 100%;
  height: 0;
  flex-shrink: 0;
  border: var(--content-divider);
`;

const StyledNoItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNoItemTitleWrapper = styled.div`
  position: absolute;
  top: 33.5px;
  left: 28px;

  ${onMobile} {
    margin-top: 30px;
    margin-left: 20px;
  }

  h1 {
    ${fontStyle(24, 700)}

    ${onMobile} {
      ${fontStyle(20, 700)}
    }
  }
`;

const StyledNoItemInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 10px;
    color: ${COLORS.GRAY_9F};
    ${fontStyle(18, 400)};

    ${onMobile} {
      ${fontStyle(14, 400)};
    }
  }
`;

const StyledImage = styled(Image)`
  ${onMobile} {
    width: 60px;
    height: 60px;
  }
`;
