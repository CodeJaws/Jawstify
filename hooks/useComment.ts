import API from '@/apis/api';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import useCardData from './ModalCard/useCardData';
import useRefresh from './useRefresh';

interface Props {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

function useComment() {
  const router = useRouter();
  const [comment, setComment] = useState<Props[]>([]);
  const { cardData } = useCardData();
  const { refresh, setRefresh } = useRefresh();
  const [cursorId, setCursorId] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);

  const [isUpdateMap, setIsUpdateMap] = useState<{ [key: number]: boolean }>({});
  const [updatedCommentMap, setUpdatedCommentMap] = useState<{ [key: number]: string }>({});
  const [value, setValues] = useState('');

  const dashboardId = Number(router.asPath.slice(1, router.asPath.indexOf('?')));
  const cardId = Number(router.asPath.slice(router.asPath.indexOf('=') + 1));

  const isOpenComment = (commentId: number) => {
    setIsUpdateMap((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleUpdateInputChange = (commentId: number, e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedCommentMap((prev) => ({ ...prev, [commentId]: e.target.value }));
  };

  const handleUpdateButtonClick = async (commentId: number) => {
    const content = updatedCommentMap[commentId];
    setIsUpdateMap((prev) => ({ ...prev, [commentId]: false }));
    await API.comments.correctComment({ commentId, content });
    setRefresh(!refresh);
  };

  const handleChange = (e: string) => {
    setValues(e);
  };

  const submitComment = async () => {
    const body = {
      content: value,
      cardId: cardId,
      columnId: cardData.columnId,
      dashboardId: dashboardId,
    };

    await API.comments.createComment(body);
    setRefresh(!refresh);
    setValues('');
  };

  const deleteComment = async (commentId: number) => {
    if (confirm('댓글을 삭제 하시겠습니까?')) await API.comments.deleteComment({ commentId });
    setRefresh(!refresh);
  };

  const fetchHasMore = () => {
    if (cursorId) {
      if (comment?.length !== 0) {
        loadCommentMore();
      }
    } else {
      setHasMore(true);
    }
  };

  const loadComment = async () => {
    const response = await API.comments.getCommentList({ size: 3, cardId: cardId });
    setComment(response.comments);
    setCursorId(response.cursorId);
  };

  const loadCommentMore = async () => {
    const response = await API.comments.getCommentList({ cardId, cursorId: cursorId });
    setComment((prev) => [...prev, ...response.comments]);
    setCursorId(response.cursorId);
  };

  useEffect(() => {
    loadComment();
  }, [refresh]);

  return {
    value,
    comment,
    hasMore,
    isUpdateMap,
    updatedCommentMap,
    isOpenComment,
    handleUpdateInputChange,
    handleUpdateButtonClick,
    handleChange,
    submitComment,
    deleteComment,
    fetchHasMore,
  };
}

export default useComment;
