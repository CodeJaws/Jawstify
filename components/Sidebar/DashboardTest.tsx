import API from '@/apis/api';
import { DashboardItem } from '@/hooks/usePagination';
import crown from '@/public/assets/icons/crown.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { styled } from 'styled-components';

interface BoardItemProps {
  item: {
    id: number;
    title: string;
    color: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
  };
  boardId: number;
}

interface DashboardTestProps {
  boardId: number;
}

function Dashboard({ item, boardId }: BoardItemProps) {
  const isActive = item.id === boardId;
  console.log(boardId);
  return (
    <Link href={`/dashboard/${item.id}`} onClick={(e) => isActive && e.preventDefault()}>
      <StyledDashboardContainer $isActive={isActive} onClick={() => {}}>
        <StyledColorWrapper $color={item.color}></StyledColorWrapper>
        <StyledTitleWrapper>{item.title}</StyledTitleWrapper>
        {item.createdByMe && <StyledImage width={17.59} height={14} src={crown} alt="방장" />}
      </StyledDashboardContainer>
    </Link>
  );
}

function DashboardTest({ boardId }: DashboardTestProps) {
  const [dataSource, setDataSource] = useState<DashboardItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [dashboardPage, setDashboardPage] = useState(2);
  const [totlaCount, setTotalCount] = useState(0);

  const getItems = async () => {
    const a = await API.dashboard.getDashboardList({ navigationMethod: 'infiniteScroll', size: 18 });
    setDataSource(a.dashboards);
    setTotalCount(a.totalCount);
  };

  const fetchHasMore = () => {
    if (dataSource.length < totlaCount) {
      if (dataSource.length !== 0) {
        handleLoadMore(dashboardPage);
      }
    } else {
      setHasMore(false);
    }
  };
  console.log(dataSource);
  const handleLoadMore = async (dashboardPage: number) => {
    const b = await API.dashboard.getDashboardList({
      navigationMethod: 'pagination',
      page: dashboardPage,
      size: 18,
    });
    setDataSource((prev) => [...prev, ...b.dashboards]);
    setDashboardPage((prev) => prev + 1);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <StyledDashboardGroupContainer>
      <InfiniteScroll pageStart={0} loadMore={fetchHasMore} hasMore={hasMore} useWindow={false} initialLoad={false}>
        {dataSource.map((item) => (
          <Dashboard key={item.id} item={item} boardId={boardId} />
        ))}
      </InfiniteScroll>
    </StyledDashboardGroupContainer>
  );
}

export default DashboardTest;

const StyledDashboardGroupContainer = styled.div`
  width: 100%;
  height: 800px;
  overflow: scroll;
  padding: 0 12px;

  ${onTablet} {
    padding: 0 10px;
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 10px;
    background: ${COLORS.GRAY_D9};
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
    top: 28px;
    width: 16.5px;
    height: 13.5px;
  }
`;