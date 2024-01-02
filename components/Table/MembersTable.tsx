import Image from 'next/image';
import styled from 'styled-components';

import API from '@/apis/api';
import usePagination from '@/hooks/usePagination';
import DefaultImage from '@/public/assets/icons/Codeit.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { MemberType } from '@/types/apiType';
import { useState } from 'react';
import Button from '../common/Button/Button';
import PaginationButton from '../common/Button/PaginationButton';

interface MembersTableProps {
  dashboardId: number;
  refresh: () => void;
}

interface TableProps {
  item: MemberType;
  refresh: () => void;
  refreshPagination: () => void;
}

/** 구성원 컴포넌트에서 하나의 줄을 의미합니다. */
function Table({ item, refresh, refreshPagination }: TableProps) {
  const { isOwner, nickname, profileImageUrl } = item;
  let buttonName = '삭제';

  /** 구성원 삭제 */
  const handleDelete = async () => {
    if (confirm(`정말 ${nickname}멤버를 삭제하시겠습니까?`)) {
      try {
        await API.members.deleteMemberInDashboard({ memberId: String(item.id) });
        refresh();
        refreshPagination();
      } catch (e: any) {
        switch (e.data.message) {
          case '대시보드 삭제 권한이 없습니다.':
            alert('대시보드 삭제 권한이 없습니다.');
            break;
          case '대시보드가 존재하지 않습니다.':
            alert('대시보드가 존재하지 않습니다.');
            break;
          case '대시보드의 멤버가 아닙니다.':
            alert('대시보드의 멤버가 아닙니다.');
            break;
          default:
            alert(e.data.message);
        }
      }
    }
  };

  return (
    <StyledMemberBoxContainer>
      <StyledMemberBoxProfileWrapper>
        <StyledMemberBoxImageWrapper>
          <Image fill src={profileImageUrl ?? DefaultImage} alt="구성원 프로필" />
        </StyledMemberBoxImageWrapper>
        <p>{nickname}</p>
      </StyledMemberBoxProfileWrapper>
      {!isOwner && (
        <Button text={buttonName} isViolet={false} size="small" onClick={() => handleDelete()} className="" />
      )}
    </StyledMemberBoxContainer>
  );
}

function MembersTable({ dashboardId, refresh }: MembersTableProps) {
  /**
   * @param handlePagination 페이지네이션 OnClick 동작 함수
   * @param pageNum 현재 페이지 넘버
   * @param showMembers 화면에 보여줄 Items
   * @param totalPages 총 페이지 수
   * @param totalCount 전체 아이템 수 - API에서 받아올 수 있습니다.
   */
  const [refreshPaginationToggle, setRefreshPaginationToggle] = useState(false);
  const refreshPagination = () => setRefreshPaginationToggle((prev) => !prev);

  const SHOW_ITEMS_SIZE = 4;
  const { handlePagination, pageNum, totalPages, allItems } = usePagination({
    size: 10,
    showItemNum: SHOW_ITEMS_SIZE,
    type: 'members',
    dashboardId,
    refreshPaginationToggle,
  });

  const tableTitle = '구성원';
  const tableSubTitle = '이름';

  const showItems = allItems.slice((pageNum - 1) * SHOW_ITEMS_SIZE, (pageNum - 1) * SHOW_ITEMS_SIZE + SHOW_ITEMS_SIZE);

  return (
    <StyledContainer>
      <StyledTopWrapper>
        <h1>{tableTitle}</h1>
        <StyledPaginationWrapper>
          <div>
            {totalPages} 페이지 중 {pageNum}
          </div>
          <div>
            <PaginationButton active={pageNum !== 1} direction="left" onClick={() => handlePagination(-1)} />
            <PaginationButton active={pageNum !== totalPages} direction="right" onClick={() => handlePagination(1)} />
          </div>
        </StyledPaginationWrapper>
      </StyledTopWrapper>
      <StyledNameText>{tableSubTitle}</StyledNameText>
      {showItems.map((item, index) => (
        <div key={item.id}>
          <Table item={item as MemberType} refresh={refresh} refreshPagination={refreshPagination} />
          {showItems.length - 1 !== index && <StyledSeperator></StyledSeperator>}
        </div>
      ))}
    </StyledContainer>
  );
}

export default MembersTable;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  flex-shrink: 0;

  height: 404px;
  border-radius: 8px;
  background: var(--content-color);
  border: var(--content-border);

  ${onTablet} {
    width: 100%;
  }

  ${onMobile} {
    /* width: 284px; */
    /* height: 337px; */
    width: 100%;
    height: auto;
  }
`;

const StyledNameText = styled.p`
  color: ${COLORS.GRAY_9F};
  ${fontStyle(16, 400)};
  margin-top: 27px;
  

  margin-left: 28px;
  /* margin-top: 14px; */
  margin-bottom: 8px;

  ${onMobile} {
    margin-top: 18px;
    margin-left: 20px;
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
      color: var(--content-main);
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
    color: var(--content-text);
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
  margin: 16px 0;

  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  ${onMobile} {
    padding: 0 20px;
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

const StyledMemberBoxImageWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  border: 1px solid transparent;
  border-radius: 100%;

  ${onMobile} {
    width: 34px;
    height: 34px;
  }
`;

const StyledSeperator = styled.div`
  width: 100%;
  height: 0;
  flex-shrink: 0;
  border: var(--content-divider);
`;
