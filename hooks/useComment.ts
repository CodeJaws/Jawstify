import API from '@/apis/api';
import { ChangeEvent, useEffect, useState } from 'react';
import useCardData from './ModalCard/useCardData';
import useCardId from './ModalCard/useCardId';
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
  const [comment, setComment] = useState<Props[]>([]);
  const { cardData } = useCardData();
  const { cardId } = useCardId();
  const { refresh, setRefresh } = useRefresh();
  const [cursorId, setCursorId] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);

  const [isUpdateMap, setIsUpdateMap] = useState<{ [key: number]: boolean }>({});
  const [updatedCommentMap, setUpdatedCommentMap] = useState<{ [key: number]: string }>({});
  const [value, setValues] = useState('');

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
      dashboardId: 325, // @TODO 대시보드 아이디 가져오기
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
    const response = await API.comments.getCommentList({ size: 2, cardId: 328 });
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
