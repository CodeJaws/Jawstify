import API from '@/apis/api';
import { InviteDashBoardProps } from '@/components/Table/InviteDashBoard';

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

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

function useInviteDashBoard({ refreshToFirst }: InviteDashBoardProps) {
  const [dataSource, setDataSource] = useState<GetInvitationListProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [cursor, setCursor] = useState(0);
  const InviteContainerRef = useRef<HTMLDivElement>(null);

  const fetchHasMore = () => {
    if (cursor) {
      if (dataSource.length !== 0) {
        handleLoadMore();
      }
    } else {
      setHasMore((prev) => !prev);
    }
  };

  const handleLoadMore = async () => {
    const item = await API.invitations.getInvitationList({ cursorId: cursor });
    setDataSource((prev) => [...prev, ...item.invitations]);
    setCursor(item.cursorId as number);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const getItems = async () => {
    const item = await API.invitations.getInvitationList({});
    setDataSource(item.invitations);
    setCursor(item.cursorId as number);
  };

  const handleAccept = async ({ acceptid, accept }: GetAcceptProps) => {
    await API.invitations.responseInvitation({ invitationId: acceptid, inviteAccepted: accept });
    setDataSource(dataSource.filter((item) => item.id !== acceptid));
    if (accept === true) {
      refreshToFirst();
    } else {
      if (InviteContainerRef.current) {
        InviteContainerRef.current.scrollTop = 0;
      }
      getItems();
      if (hasMore === false) {
        setHasMore((prev) => !prev);
      }
    }
  };

  const handleSearch = async (searchText: string) => {
    const searchItem = await API.invitations.getInvitationList({ title: searchText });
    if (searchItem.invitations.length > 0) {
      setDataSource(searchItem.invitations);
      setCursor(searchItem.cursorId as number);
    } else {
      alert('검색된 데이터가 없습니다.');
      getItems();
      setSearchText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchText);
    }
  };

  useEffect(() => {
    getItems();
    if (InviteContainerRef.current) {
      InviteContainerRef.current.scrollTop = 0;
      setHasMore((prev) => !prev);
    }
  }, []);

  return {
    dataSource,
    searchText,
    handleChange,
    handleKeyDown,
    InviteContainerRef,
    fetchHasMore,
    hasMore,
    handleAccept,
  };
}

export default useInviteDashBoard;
