import useSidebarDashboard from '@/hooks/UseSidebarDashboard';
import crown from '@/public/assets/icons/crown.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import Link from 'next/link';
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
  boardId?: number;
}

export interface DashboardProps {
  boardId?: number;
  refreshToggle?: boolean;
  refresh?: () => void;
}

function DashboardItems({ item, boardId }: BoardItemProps) {
  const isActive = item.id === boardId;
  return (
    <Link href={`/dashboard/${item.id}`} onClick={(e) => isActive && e.preventDefault()}>
      <StyledDashboardContainer $isActive={isActive}>
        <StyledColorWrapper $color={item.color}></StyledColorWrapper>
        <StyledTitleWrapper>{item.title}</StyledTitleWrapper>
        {item.createdByMe && <StyledImage width={17} height={14} sizes="100%" src={crown} alt="방장" />}
      </StyledDashboardContainer>
    </Link>
  );
}

function Dashboard({ boardId, refreshToggle, refresh }: DashboardProps) {
  const { dashboardContainerRef, fetchHasMore, hasMore, dataSource } = useSidebarDashboard({ refreshToggle, refresh });

  return (
    <StyledDashboardGroupContainer ref={dashboardContainerRef}>
      <InfiniteScroll pageStart={0} loadMore={fetchHasMore} hasMore={hasMore} useWindow={false} initialLoad={false}>
        {dataSource.map((item) => (
          <DashboardItems key={item.id} item={item} boardId={boardId} />
        ))}
      </InfiniteScroll>
    </StyledDashboardGroupContainer>
  );
}

export default Dashboard;

const StyledDashboardGroupContainer = styled.div`
  width: 100%;
  height: 790px;
  overflow: scroll;
  padding: 0 12px;

  ${onTablet} {
    padding: 0 10px;
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
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
    background: var(--sidebar-hover);
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
