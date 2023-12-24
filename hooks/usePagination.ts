import { useEffect, useState } from 'react';
import DEFAULT_IMAGE from '@/public/assets/icons/PinkEllipse.svg';

/** 대시보드 멤버 목록 조회를 통해 나온 정보들 - 이것도 나중에 정보를 받으면 수정 될듯 합니다*/
const DEFAULT_INFO_OF_MEMBERS = [
  {
    id: 1,
    nickname: '정만철1@naver.com',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: false,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
  {
    id: 2,
    nickname: '김태순2',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: false,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
  {
    id: 3,
    nickname: '최주협3',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: false,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
  {
    id: 4,
    nickname: '윤지현4',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: false,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
  {
    id: 5,
    nickname: '박종민5',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: true,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
  {
    id: 6,
    nickname: '박민6',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: false,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
];

/** 추가하는 멤버들 */
const DEFAULT_ADD_MEMBERS = [
  {
    id: 7,
    nickname: '정만철7',
    profileImageUrl: DEFAULT_IMAGE,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
    isOwner: false,
  },
  {
    id: 8,
    nickname: '김태순8',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: false,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
  {
    id: 9,
    nickname: '최주협9',
    profileImageUrl: DEFAULT_IMAGE,
    isOwner: false,
    createdAt: 'string',
    updatedAt: 'string',
    userId: 1,
  },
];

interface usePaginationProps {
  size: number;
  showItemNum: 4 | 5;
  type: 'members' | 'invitationDetails' | 'dashboard';
  dashboardId?: number;
}

interface usePaginationReturn<T> {
  handlePagination: (val: number) => void;
  showItems: AllItemTypes<T>;
  pageNum: number;
  totalPages: number;
  totalCount: number;
}

/** 대시보드 API Types */
export interface DashboardItem {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

/** 구성원들 API Types */
export interface MembersItem {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

/** 초대 내역 API Types */
export interface InvitationItem {
  id: number;
  inviterUserId: number;
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

export type AllItemTypes<T> = Tt<T>;

type Tt<T> = T extends 'members' ? MembersItem[] : T extends 'invitationDetails' ? InvitationItem[] : DashboardItem[];

/**
 * @param size API에서 한번에 받아올 구성원 수 - API 요청 시 사용
 * @param showItemNum 한 화면에서 보여줄 Item 수
 * @param type 어디서 페이지네이션 사용하는지 확인할 type
 * @param dashboardId 대시보드 멤버 목록 조회 API에서 사용
 */
const usePagination = ({
  size,
  showItemNum,
  type,
  dashboardId,
}: usePaginationProps): usePaginationReturn<typeof type> => {
  const [pageNum, setPageNum] = useState(1);
  const [allItems, setAllItems] = useState<AllItemTypes<typeof type>>([]);
  const [showItems, setShowItems] = useState<AllItemTypes<typeof type>>([]);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / showItemNum); // 총 페이지 수

  /** Pagination 버튼 클릭 시 axios 함수를 여기에 적으면 될 것 같네요 */
  const handlePagination = (num: number) => {
    if ((pageNum + num - 1) * showItemNum > totalCount) return; // 전체 아이템 수 이상을 받아오려는 경우
    if (pageNum + num < 1 || pageNum + num > totalPages) return; // 처음에서 <, 마지막 페이지에서 > 버튼을 클릭 하는 경우

    if ((pageNum + num) * showItemNum > allItems.length) {
      // axios 요청
      if (type === 'members') {
        // 구성원 API 요청
        //   setAllItems(prev => [...prev, 받은 데이터])
      } else if (type === 'invitationDetails') {
        // 초대 내역 API 요청
        //   setAllItems(prev => [...prev, 받은 데이터])
      } else if (type === 'dashboard') {
        // 대시보드 API 요청
        //   setAllItems(prev => [...prev, 받은 데이터])
      }
      setAllItems((prev) => [...prev, ...DEFAULT_ADD_MEMBERS] as AllItemTypes<typeof type>);
    }

    setPageNum((prev) => prev + num);
    return;
  };

  useEffect(() => {
    setShowItems(allItems.slice((pageNum - 1) * showItemNum, (pageNum - 1) * showItemNum + showItemNum));

    /** 아이템(대시보드 or 구성원들 or 초대 내역)들의 첫 갱신 */
    const firstFetch = async () => {
      setAllItems(DEFAULT_INFO_OF_MEMBERS);
      setShowItems(DEFAULT_INFO_OF_MEMBERS.slice(0, showItemNum));
      setTotalCount(9); // 전체 아이템 수 - API에서 받아올 수 있습니다.(24는 DEFAULT 값입니다.)
    };

    if (allItems.length === 0) {
      firstFetch();
    }
  }, [allItems, pageNum, showItemNum]);

  return { handlePagination, pageNum, showItems, totalPages, totalCount };
};

export default usePagination;
