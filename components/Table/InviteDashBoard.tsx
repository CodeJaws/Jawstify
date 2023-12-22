import useDeviceType from '@/hooks/useDeviceType';
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
  const windowSize = useDeviceType();

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
      {!(windowSize === 'mobile') && (
        <StyledWrapper>
          <StyledInWrapper>이름</StyledInWrapper>
          <StyledInWrapper>초대자</StyledInWrapper>
          <StyledInWrapper>수락 여부</StyledInWrapper>
        </StyledWrapper>
      )}
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchHasMore}
        hasMore={hasMore}
        loader={<p>로딩중...</p>}
        useWindow={false}
        initialLoad={false}
      >
        {dataSource.map((item, index) => {
          return (
            <>
              {windowSize === 'mobile' ? (
                <>
                  <StyledMobileContainer>
                    <StyledMobileLeftDiv>
                      <div>이름</div>
                      <div>초대자</div>
                    </StyledMobileLeftDiv>
                    <StyledMobileRightDiv>
                      <div>프로덕트 디자인</div>
                      <div>윤혁님#{index + 1}</div>
                    </StyledMobileRightDiv>
                  </StyledMobileContainer>
                  <StyledMobileButtonWrapper>
                    <TwinButton text1="수락" text2="거절" isViolet={true} size="small" onClick={anyfunction} />
                  </StyledMobileButtonWrapper>
                </>
              ) : (
                <StyleListWrapper>
                  <StyledListInWrapper>프로덕트 디자인</StyledListInWrapper>
                  <StyledListInWrapper>종민님#{index + 1}</StyledListInWrapper>
                  <StyledListInWrapper>
                    <TwinButton text1="수락" text2="거절" isViolet={true} size="small" onClick={anyfunction} />
                  </StyledListInWrapper>
                </StyleListWrapper>
              )}

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
    width: 448px;
    height: 40px;
  }
  ${onMobile} {
    margin: 20px 16px 0;
    width: 228px;
    height: 36px;
  }
`;

const StyledInput = styled.input`
  width: 800px;
  height: 38px;
  ${fontStyle(16, 400)}
  ${onTablet} {
    width: 390px;
    height: 35px;
  }
  ${onMobile} {
    width: 180px;
    height: 32px;
    font-size: 14px;
  }
`;

const StyledSearchImage = styled(Image)`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  ${onMobile} {
    margin-left: 12px;
  }
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding: 31px 0 4px 28px;
  ${onTablet} {
    grid-template-columns: 1fr 0.7fr 1fr;
  }
  ${onMobile} {
    display: flex;
    flex-direction: column;
    width: 23%;
  }
`;
const StyledInWrapper = styled.div`
  width: 100%;
  color: ${COLORS.GRAY_9F};
  ${fontStyle(16, 400)}
`;

const StyleListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 20px 0 20px 28px;
  ${onTablet} {
    grid-template-columns: 1fr 0.7fr 1fr;
  }
  ${onMobile} {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
`;
const StyledListInWrapper = styled.div`
  float: left;
  width: 100%;
  color: ${COLORS.BLACK_33};
  ${fontStyle(16, 400)}
`;

const StyledHr = styled.hr`
  background: ${COLORS.GRAY_EE};
  height: 1px;
  border: 0;
`;

const StyledMobileContainer = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
`;

const StyledMobileLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${COLORS.GRAY_9F};
  ${fontStyle(14, 400)}
`;

const StyledMobileRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${COLORS.BLACK_33};
  ${fontStyle(14, 400)}
`;

const StyledMobileButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;
