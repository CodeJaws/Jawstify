import useDeviceType from '@/hooks/useDeviceType';
import search from '@/public/assets/icons/Search.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled, { css } from 'styled-components';
import TwinButton from '../common/Button/TwinButton';
import NoContent from '@/public/assets/images/NoContent.png';

const mock = [
  {
    id: 1,
    name: '프로덕트1',
    inviter: '종민님1',
  },
  {
    id: 2,
    name: '프로덕트2',
    inviter: '종민님2',
  },
  {
    id: 3,
    name: '프로덕트3',
    inviter: '종민님3',
  },
  {
    id: 4,
    name: '프로덕트4',
    inviter: '종민님4',
  },
  {
    id: 5,
    name: '프로덕트5',
    inviter: '종민님5',
  },
  {
    id: 6,
    name: '프로덕트6',
    inviter: '종민님6',
  },
];

const addMock = [
  {
    id: 7,
    name: '종민프로덕트7',
    inviter: '종민님7',
  },
  {
    id: 8,
    name: '소은프로덕트8',
    inviter: '종민님8',
  },
  {
    id: 9,
    name: '기연프로덕트9',
    inviter: '종민님9',
  },
  {
    id: 10,
    name: '윤혁프로덕트10',
    inviter: '종민님10',
  },
  {
    id: 11,
    name: '프로덕트11',
    inviter: '종민님11',
  },
  {
    id: 12,
    name: '프로덕트12',
    inviter: '종민님12',
  },
  {
    id: 13,
    name: '종민프로덕트13',
    inviter: '종민님13',
  },
  {
    id: 14,
    name: '소은프로덕트14',
    inviter: '종민님14',
  },
  {
    id: 15,
    name: '기연프로덕트15',
    inviter: '종민님15',
  },
  {
    id: 16,
    name: '윤혁프로덕트16',
    inviter: '종민님16',
  },
  {
    id: 17,
    name: '프로덕트17',
    inviter: '종민님17',
  },
  {
    id: 18,
    name: '프로덕트18',
    inviter: '종민님18',
  },
];

function InviteDashBoard() {
  const [dataSource, setDataSource] = useState(mock);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const windowSize = useDeviceType();
  const width = windowSize === 'pc' || windowSize === 'tablet';

  const fetchHasMore = () => {
    if (dataSource.length < 18) {
      setTimeout(() => {
        if (dataSource.length !== 0) {
          setDataSource((prev) => [...prev, ...addMock]);
        }
      }, 500);
    } else {
      setHasMore(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const showItems = dataSource.filter((item) => item.name.includes(searchText));
  return (
    <StyledDiv $data={mock}>
      <StyledP>초대받은 대시보드</StyledP>
      {dataSource.length !== 0 ? (
        <div>
          <StyledInputDiv>
            <label htmlFor="search">
              <StyledSearchImage src={search} alt="search" />
            </label>
            <StyledInput id="search" placeholder="검색" onChange={handleChange} />
          </StyledInputDiv>
          {!(windowSize === 'mobile') && windowSize !== undefined && (
            <StyledWrapper>
              <StyledInWrapper>이름</StyledInWrapper>
              <StyledInWrapper>초대자</StyledInWrapper>
              <StyledInWrapper>수락 여부</StyledInWrapper>
            </StyledWrapper>
          )}
          <Div>
            <InfiniteScroll
              pageStart={0}
              loadMore={fetchHasMore}
              hasMore={hasMore}
              useWindow={false}
              initialLoad={false}
            >
              {showItems.length !== 0 ? (
                showItems.map((item) => {
                  return (
                    <div key={item.id}>
                      {windowSize === 'mobile' && (
                        <>
                          <StyledMobileContainer>
                            <StyledMobileLeftDiv>
                              <div>이름</div>
                              <div>초대자</div>
                            </StyledMobileLeftDiv>
                            <StyledMobileRightDiv>
                              <div>{item.name}</div>
                              <div>{item.inviter}</div>
                            </StyledMobileRightDiv>
                          </StyledMobileContainer>
                          <StyledMobileButtonWrapper>
                            <TwinButton
                              text1="수락"
                              text2="거절"
                              isViolet={true}
                              size="small"
                              className="temp1"
                              onLeftClick={() => {}}
                              onRightClick={() => {}}
                            />
                          </StyledMobileButtonWrapper>
                        </>
                      )}
                      {width && (
                        <StyleListWrapper>
                          <StyledListInWrapper>{item.name}</StyledListInWrapper>
                          <StyledListInWrapper>{item.inviter}</StyledListInWrapper>
                          <StyledListInWrapper>
                            <TwinButton
                              text1="수락"
                              text2="거절"
                              isViolet={true}
                              size="small"
                              className="temp2"
                              onLeftClick={() => {}}
                              onRightClick={() => {}}
                            />
                          </StyledListInWrapper>
                        </StyleListWrapper>
                      )}
                      <StyledHr />
                    </div>
                  );
                })
              ) : (
                <StyledErrorDiv>검색 결과가 없습니다.</StyledErrorDiv>
              )}
            </InfiniteScroll>
          </Div>
        </div>
      ) : (
        <>
          <NoContentContainer>
            <NoContentImage src={NoContent} alt="없는컨텐츠" />
            <NoContentDiv>아직 초대받은 대시보드가 없어요</NoContentDiv>
          </NoContentContainer>
        </>
      )}
    </StyledDiv>
  );
}

export default InviteDashBoard;

const Div = styled.div`
  height: 400px;
  overflow-x: hidden;
  ${onMobile} {
    height: 700px;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border: 1px solid ${COLORS.BLACK_17};
    border-radius: 10px;
  }
`;

const StyledDiv = styled.div<{ $data: any }>`
  width: 1023px;
  height: 600px;
  border-radius: 8px;
  background: ${COLORS.WHITE_FF};

  ${onTablet} {
    width: 504px;
    height: 592px;
  }
  ${onMobile} {
    width: 260px;
    height: 836px;
  }

  ${({ $data }) =>
    Object.keys($data).length == 0 &&
    css`
      height: 400px;
      ${onTablet} {
        height: 400px;
      }
      ${onMobile} {
        height: 400px;
      }
    `}
`;

const StyledP = styled.p`
  padding: 32px 0 0 28px;
  ${fontStyle(24, 700)};
  ${onMobile} {
    padding: 24px 0 0 16px;
    font-size: 20px;
  }
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
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.WHITE_FF};
  ${onTablet} {
    width: 448px;
    height: 40px;
  }
  ${onMobile} {
    margin: 20px 16px 15px;
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
    width: 22px;
    height: 22px;
  }
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding: 31px 0 14px 28px;
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
  ${fontStyle(16, 400)};
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
  padding: 20px 16px 16px 16px;
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

const StyledErrorDiv = styled.div`
  color: ${COLORS.BLACK_33};
  ${fontStyle(16, 400)};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 31px;
`;

const NoContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 122px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  ${onMobile} {
    padding-bottom: 96px;
    gap: 16px;
  }
`;

const NoContentImage = styled(Image)`
  width: 100px;
  height: 100px;
  ${onMobile} {
    width: 60px;
    height: 60px;
  }
`;

const NoContentDiv = styled.div`
  color: ${COLORS.GRAY_9F};
  ${fontStyle(18, 400)}
  ${onMobile} {
    font-size: 14px;
  }
`;
