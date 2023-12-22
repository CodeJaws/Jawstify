import Image from 'next/image';
import styled from 'styled-components';

import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import { onMobile } from '@/styles/mediaQuery';
import usePagination, { InvitationItem, MembersItem } from '@/hooks/usePagination';
import PaginationButton from '../common/Button/PaginationButton';
import Button from '../common/Button/Button';
import InviteButton from './InviteButton';

interface TablePaginationProps {
  dashboardId: number;
  table: 'members' | 'invitationDetails';
}

interface TableProps {
  item: MembersItem | InvitationItem;
  table: 'members' | 'invitationDetails';
}

/** 구성원 컴포넌트에서 하나의 줄을 의미합니다. Type은 any에서 들어온 type으로 바꾸어주면 됩니다. */
function Table({ item, table }: TableProps) {
  let profileImg = '';
  let buttonName = '삭제';
  let itemName;

  if (table === 'members' && 'nickname' in item) {
    profileImg = item.profileImageUrl;
    buttonName = '삭제';
    itemName = item?.nickname;
  } else if ('invitee' in item && item.invitee) {
    buttonName = '취소';
    itemName = item?.invitee?.email;
  }

  /** 구성원 삭제 */
  const handleDelete = () => {};

  return (
    <StyledMemberBoxContainer>
      <StyledMemberBoxProfileWrapper>
        {table === 'members' && (
          <StyledMemberBoxImageWrapper>
            <Image fill src={profileImg} alt="구성원 프로필 이미지" />
          </StyledMemberBoxImageWrapper>
        )}
        <p>{itemName}</p>
      </StyledMemberBoxProfileWrapper>
      <Button text={buttonName} isViolet={false} size="small" onClick={() => handleDelete()} />
    </StyledMemberBoxContainer>
  );
}

function TablePagination({ dashboardId, table }: TablePaginationProps) {
  /**
   * @param handlePagination 페이지네이션 OnClick 동작 함수
   * @param pageNum 현재 페이지 넘버
   * @param showMembers 화면에 보여줄 Items
   * @param totalPages 총 페이지 수
   * @param totalCount 전체 아이템 수 - API에서 받아올 수 있습니다.
   */
  const { handlePagination, pageNum, showItems, totalPages, totalCount } = usePagination({
    size: 20,
    showItemNum: 4,
    type: 'members',
    dashboardId,
  });

  const tableTitle = table === 'members' ? '구성원' : '초대 내역';
  const tableSubTitle = table === 'members' ? '이름' : '이메일';

  /** 초대하기 버튼 클릭 시 동작 */
  const handleInvite = () => {};

  return (
    <StyledContainer>
      <StyledTopWrapper>
        <h1>{tableTitle}</h1>
        <StyledPaginationWrapper>
          <div>
            {Math.ceil(totalCount / 4)}페이지 중 {pageNum}
          </div>
          <div>
            <PaginationButton active={pageNum !== 1} direction="left" onClick={() => handlePagination(-1)} />
            <PaginationButton active={pageNum !== totalPages} direction="right" onClick={() => handlePagination(1)} />
          </div>
          <InviteButton text="초대하기" onClick={handleInvite} />
        </StyledPaginationWrapper>
      </StyledTopWrapper>
      <StyledNameText>{tableSubTitle}</StyledNameText>
      {showItems.map((item, index) => (
        <>
          <Table key={item.id} item={item as MembersItem | InvitationItem} table={table} />
          {showItems.length - 1 !== index && <StyledMemberBoxSeperator></StyledMemberBoxSeperator>}
        </>
      ))}
    </StyledContainer>
  );
}

export default TablePagination;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  height: 404px;
  flex-shrink: 0;

  border-radius: 8px;
  background: ${COLORS.WHITE_FF};

  ${onMobile} {
    width: 284px;
    height: 337px;
  }
`;

const StyledNameText = styled.p`
  color: ${COLORS.GRAY_9F};
  ${fontStyle(16, 400)};

  margin-left: 28px;
  margin-top: 14px;
  margin-bottom: 24px;

  ${onMobile} {
    margin-left: 20px;
  }
`;

const StyledTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  h1 {
    color: ${COLORS.BLACK_33};
    ${fontStyle(24, 700)};
  }
  margin-top: 26px;

  ${onMobile} {
    h1 {
      color: ${COLORS.BLACK_33};
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
    color: ${COLORS.BLACK_33};
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

  ${onMobile} {
    padding: 0 20px;
  }
`;

const StyledMemberBoxProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    color: ${COLORS.BLACK_33};
    ${fontStyle(16, 400)};
  }

  ${onMobile} {
    gap: 8px;
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

const StyledMemberBoxSeperator = styled.div`
  width: 100%;
  height: 0;
  flex-shrink: 0;
  border: 1px solid ${COLORS.GRAY_EE};
  margin: 16px 0;
`;
