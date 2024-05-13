import Image from 'next/image';
import styled from 'styled-components';

import { useDeleteMemberInDashboard } from '@/apis/queries/members';
import Button from '@/components/common/Button/Button';
import PaginationButton from '@/components/common/Button/PaginationButton';
import usePagination from '@/hooks/Common/usePagination';
import DefaultImage from '@/public/assets/images/jaws.avif';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { MemberType } from '@/types/apiType';

interface MembersTableProps {
  dashboardId: number;
}

interface TableProps {
  item: MemberType;
  pageNum: number;
}

function Table({ item, pageNum }: TableProps) {
  const { isOwner, nickname, profileImageUrl } = item;
  let buttonName = '삭제';

  const {
    mutate: deleteMemberInDashboardMutate,
    isPending,
    isError,
    error,
    isSuccess,
  } = useDeleteMemberInDashboard({ pageNum });

  const handleDelete = async () => {
    if (confirm(`정말 ${nickname}멤버를 삭제하시겠습니까?`)) {
      await deleteMemberInDashboardMutate({ memberId: item.id });
    }
  };

  return (
    <StyledMemberBoxContainer>
      <StyledMemberBoxProfileWrapper>
        <StyledMemberBoxImageWrapper>
          <StyledMemberImage fill sizes="100%" src={profileImageUrl ?? DefaultImage} priority alt="구성원 프로필" />
        </StyledMemberBoxImageWrapper>
        <p>{nickname}</p>
      </StyledMemberBoxProfileWrapper>
      {!isOwner && (
        <Button text={buttonName} isViolet={false} size="small" onClick={() => handleDelete()} className="" />
      )}
    </StyledMemberBoxContainer>
  );
}

function MembersTable({ dashboardId }: MembersTableProps) {
  /**
   * @param handlePagination 페이지네이션 OnClick 동작 함수
   * @param pageNum 현재 페이지 넘버
   * @param showMembers 화면에 보여줄 Items
   * @param totalPages 총 페이지 수
   * @param totalCount 전체 아이템 수 - API에서 받아올 수 있습니다.
   */

  const { handlePageNum, pageNum, totalPages, allItems } = usePagination({
    size: 4,
    type: 'members',
    dashboardId,
  });

  const tableTitle = '구성원';
  const tableSubTitle = '이름';

  if (!allItems) return null;

  return (
    <StyledContainer>
      <StyledTopWrapper>
        <h1>{tableTitle}</h1>
        <StyledPaginationWrapper>
          <div>
            {totalPages} 페이지 중 {pageNum}
          </div>
          <div>
            <PaginationButton active={pageNum !== 1} direction="left" onClick={() => handlePageNum(-1)} />
            <PaginationButton active={pageNum !== totalPages} direction="right" onClick={() => handlePageNum(1)} />
          </div>
        </StyledPaginationWrapper>
      </StyledTopWrapper>
      <StyledNameText>{tableSubTitle}</StyledNameText>
      {allItems.map((item, index) => (
        <div key={item.id}>
          <Table item={item as MemberType} pageNum={pageNum} />
          {allItems.length - 1 !== index && <StyledSeparator />}
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

  overflow: hidden;

  height: 404px;
  border-radius: 8px;
  background: var(--content-color);
  border: var(--content-border);

  ${onTablet} {
    width: 100%;
  }

  ${onMobile} {
    width: 100%;
    height: auto;
  }
`;

const StyledMemberImage = styled(Image)`
  border-radius: 100%;
`;

const StyledNameText = styled.p`
  color: ${COLORS.GRAY_9F};
  ${fontStyle(16, 400)};
  margin-top: 27px;

  margin-left: 28px;
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

  ${onMobile} {
    width: 34px;
    height: 34px;
  }
`;

const StyledSeparator = styled.div`
  width: 100%;
  height: 0;
  flex-shrink: 0;
  border: var(--content-divider);
`;
