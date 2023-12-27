import Image from 'next/image';
import styled from 'styled-components';

import API from '@/apis/api';
import crown from '@/public/assets/icons/crown.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { useEffect, useState } from 'react';

/**
 * Page 작성 시 맞는 Type으로 수정해야 하는 부분입니다. */
interface DashboardGroupProps {
  group: {
    id: number;
    name: string;
    color: string;
    createdByMe: boolean;
  }[];
}

interface DashboardProps {
  item: {
    id: number;
    name: string;
    color: string;
    createdByMe: boolean;
  };
}

// interface DashBoardProps

function Dashboard({ item }: DashboardProps) {
  const DEFAULT_BOARD_ID = 1; // 주소창의 dashboardId를 받기

  /** 현재 있는 대시보드를 하이라이트하는 변수 */
  const isActive = item.id === DEFAULT_BOARD_ID;

  /** dashboard 이동 함수 - router 사용해도 좋다 */
  const handleClick = () => {};

  return (
    <StyledDashboardContainer $isActive={isActive} onClick={handleClick}>
      <StyledColorWrapper $color={item.color}></StyledColorWrapper>
      <StyledTitleWrapper>{item.name}</StyledTitleWrapper>
      {item.createdByMe && <StyledImage width={17.59} height={14} src={crown} alt="방장" />}
    </StyledDashboardContainer>
  );
}

function DashboardGroup({ firstId }: number) {
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getItems = async () => {
    const a = await API.dashboard.getDashboardList({ navigationMethod: 'infiniteScroll' });
    // setDataSource(a.dashboards);
    console.log(a);
  };

  const fetchHasMore = () => {
    if (dataSource.length < 18) {
      setTimeout(() => {
        if (dataSource.length !== 0) {
          // setDataSource((prev) => [...prev, ...addMock]);
        }
      }, 500);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <></>
    // <StyledDashboardGroupContainer>
    //   <InfiniteScroll pageStart={0} loadMore={fetchHasMore} hasMore={hasMore} useWindow={false} initialLoad={false}>
    //     {/* {group.map((board) => (
    //     <Dashboard key={board.id} item={board} />
    //   ))} */}
    //   </InfiniteScroll>
    //   {/* {group.map((board) => (
    //     <Dashboard key={board.id} item={board} />
    //   ))} */}
    // </StyledDashboardGroupContainer>
  );
}

export default DashboardGroup;

const StyledDashboardGroupContainer = styled.div`
  width: 100%;
  padding: 0 12px;

  ${onTablet} {
    padding: 0 10px;
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  transform: rotate(-45deg);
  left: 2.5px;
  top: 10px;

  ${onTablet} {
    left: 2.35px;
    top: 10px;
  }

  ${onMobile} {
    left: 6px;
    top: 27px;
  }
`;

const StyledTitleWrapper = styled.div`
  color: ${COLORS.GRAY_78};
  margin-left: 16px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${onPc} {
    ${fontStyle(18, 500)};
    margin-right: 6px;
  }

  ${onTablet} {
    ${fontStyle(16, 500)};
    margin-right: 4px;
  }

  ${onMobile} {
    display: none;
  }
`;

const StyledDashboardContainer = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 45px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${COLORS.WHITE_FF};

  &:hover {
    border-radius: 4px;
    background: ${COLORS.VIOLET_F1};
  }
  background: ${({ $isActive }) => ($isActive ? `${COLORS.VIOLET_F1}` : 'transparent')};

  ${onPc} {
    padding: 0 12px;
  }

  ${onTablet} {
    padding: 0 12px;
  }

  ${onMobile} {
    justify-content: center;
    background: transparent;

    &:hover {
      background: transparent;
    }
  }
`;

const StyledColorWrapper = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 100%;
  background: ${({ $color }) => $color};

  ${onMobile} {
    margin-top: 36px;
  }
`;
