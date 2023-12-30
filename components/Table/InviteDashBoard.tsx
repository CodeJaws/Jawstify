import API from '@/apis/api';
import useDeviceType from '@/hooks/useDeviceType';
import search from '@/public/assets/icons/Search.svg';
import NoContent from '@/public/assets/images/NoContent.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled, { css } from 'styled-components';
import TwinButton from '../common/Button/TwinButton';

interface GetInvitationListProps {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAcceptProps {
  acceptid: number;
  accept: boolean;
}

interface InviteDashBoardProps {
  refresh: () => void;
  refreshToFirst: () => void;
}

function InviteDashBoard({ refresh, refreshToFirst }: InviteDashBoardProps) {
  const [dataSource, setDataSource] = useState<GetInvitationListProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [cursor, setCursor] = useState(0);
  const windowSize = useDeviceType();
  const width = windowSize === 'pc' || windowSize === 'tablet';

  const fetchHasMore = () => {
    if (cursor) {
      if (dataSource.length !== 0) {
        handleLoadMore();
      }
    } else {
      setHasMore(false);
    }
  };

  const handleLoadMore = async () => {
    const b = await API.invitations.getInvitationList({ cursorId: cursor });
    setDataSource((prev) => [...prev, ...b.invitations]);
    setCursor(b.cursorId as number);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const getItems = async () => {
    const a = await API.invitations.getInvitationList({});
    setDataSource(a.invitations);
    setCursor(a.cursorId as number);
  };

  const handleAccept = async ({ acceptid, accept }: GetAcceptProps) => {
    await API.invitations.responseInvitation({ invitationId: acceptid, inviteAccepted: accept });
    setDataSource(dataSource.filter((item) => item.id !== acceptid));
    refresh();
    refreshToFirst();
  };

  useEffect(() => {
    getItems();
  }, []);

  const showItems = dataSource.filter((item) => item.dashboard.title.includes(searchText));
  return (
    <StyledDiv $data={dataSource}>
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
                          {/* 모바일 사이즈 */}
                          <StyledMobileContainer>
                            <StyledMobileLeftDiv>
                              <div>이름</div>
                              <div>초대자</div>
                            </StyledMobileLeftDiv>
                            <StyledMobileRightDiv>
                              <div>{item.dashboard.title}</div>
                              <div>{item.inviter.nickname}</div>
                            </StyledMobileRightDiv>
                          </StyledMobileContainer>
                          <StyledMobileButtonWrapper>
                            <TwinButton
                              text1="수락"
                              text2="거절"
                              isViolet={true}
                              size="small"
                              className="temp1"
                              onLeftClick={() => handleAccept({ acceptid: item.id, accept: true })}
                              onRightClick={() => handleAccept({ acceptid: item.id, accept: false })}
                            />
                          </StyledMobileButtonWrapper>
                        </>
                      )}
                      {width && (
                        // 모바일 외 사이즈
                        <StyleListWrapper>
                          <StyledListInWrapper>{item.dashboard.title}</StyledListInWrapper>
                          <StyledListInWrapper>{item.inviter.nickname}</StyledListInWrapper>
                          <StyledListInWrapper>
                            <TwinButton
                              text1="수락"
                              text2="거절"
                              isViolet={true}
                              size="small"
                              className="temp2"
                              violet={true}
                              onLeftClick={() => handleAccept({ acceptid: item.id, accept: true })}
                              onRightClick={() => handleAccept({ acceptid: item.id, accept: false })}
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
