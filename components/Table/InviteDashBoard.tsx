import search from '@/public/assets/icons/Search.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import TwinButton from '../common/Button/TwinButton';

function InviteDashBoard() {
  const [dataSource, setDataSource] = useState(Array.from({ length: 6 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchHasMore = () => {
    if (dataSource.length < 100) {
      setTimeout(() => {
        setDataSource(dataSource.concat(Array.from({ length: 6 })));
      }, 500);
    } else {
      setHasMore(false);
    }
  };
  const anyfunction = () => {};
  return (
    <StyledDiv>
      <StyledP>초대받은 대시보드</StyledP>
      <StyledInputDiv>
        <StyledSearchImage src={search} alt="search" />
        <StyledInput placeholder="검색" />
      </StyledInputDiv>
      <StyledUl>
        <StyledLi>이름</StyledLi>
        <StyledLi>초대자</StyledLi>
        <StyledLi>수락 여부</StyledLi>
      </StyledUl>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchHasMore}
        hasMore={hasMore}
        loader={<P>로딩중...</P>}
        useWindow={false}
        initialLoad={false}
      >
        {dataSource.map((item, index) => {
          return (
            <>
              <StyledUl>
                <StyledLi>프로덕트 디자인</StyledLi>
                <StyledLi>#{index + 1}</StyledLi>
                <StyledLi>
                  <TwinButton text1="수락" text2="거절" isViolet={true} size="small" onClick={anyfunction} />
                </StyledLi>
              </StyledUl>
              <StyledHr />
            </>
          );
        })}
      </InfiniteScroll>
    </StyledDiv>
  );
}

export default InviteDashBoard;

const StyledDiv = styled.div`
  overflow-x: hidden;
  width: 1023px;
  height: 600px;
  border: 1px solid gray;
  margin: 10px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border: 1px solid ${COLORS.BLACK_17};
    border-radius: 10px;
  }
  ${onTablet} {
    width: 504px;
    height: 592px;
  }
  ${onMobile} {
    width: 260px;
    height: 836px;
  }
`;

const StyledP = styled.p`
  padding: 32px 0 0 28px;
  ${fontStyle(24, 700)};
`;

const StyledInputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 966px;
  height: 40px;
  border-radius: 6px;
  margin: 20px 28px 0;
  border: 1px solid var(--gray-gray_D9D9D9, #d9d9d9);
  background: var(--white-white_FFFFFF, #fff);
  ${onTablet} {
    width: 488px;
    height: 40px;
  }
`;

const StyledInput = styled.input`
  width: 800px;
  height: 38px;
`;

const StyledSearchImage = styled(Image)`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;

const StyledUl = styled.ul`
  width: 100%;
  padding: 31px 0 40px 28px;
`;
const StyledLi = styled.li`
  float: left;
  width: 33%;
  color: ${COLORS.GRAY_9F};
  ${fontStyle(16, 400)}
`;
const StyledHr = styled.hr``;

const P = styled.p``;

const ListContainer = styled.div``;
