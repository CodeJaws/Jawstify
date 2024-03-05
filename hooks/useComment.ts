import API from '@/apis/api';
import useRefresh from '@/hooks/Common/useRefresh';
import useCardId from '@/hooks/ModalCard/useCardId';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import { GetCardDetailsItem } from '@/types/api';

import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

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
  const { cardId } = useCardId();
  const { dashboardId } = useDashBoardId();
  const { refresh, setRefresh } = useRefresh();
  const [cursorId, setCursorId] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);

  const [isUpdateMap, setIsUpdateMap] = useState<{ [key: number]: boolean }>({});
  const [updatedCommentMap, setUpdatedCommentMap] = useState<{ [key: number]: string }>({});
  const [value, setValues] = useState('');
  const CommentWrapperRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const card = queryClient.getQueryData(['card', cardId]);
  const cardData = card as GetCardDetailsItem;

  const isOpenComment = (commentId: number) => {
    setIsUpdateMap((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleUpdateInputChange = (commentId: number, e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedCommentMap((prev) => ({ ...prev, [commentId]: e.target.value }));
  };

  const handleUpdateButtonClick = async (commentId: number) => {
    const content = updatedCommentMap[commentId];
    setIsUpdateMap((prev) => ({ ...prev, [commentId]: false }));
    await API.comments.correctComment({ commentId, content }).then(() => {
      toast.success('댓글 수정 완료');
    });
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

    await API.comments.createComment(body).then(() => {
      toast.success('댓글 달기 성공');
    });
    setRefresh(!refresh);
    setValues('');
  };

  const deleteComment = async (commentId: number) => {
    if (confirm('댓글을 삭제 하시겠습니까?'))
      await API.comments.deleteComment({ commentId }).then(() => {
        toast('댓글 삭제 완료', { icon: '❌' });
      });
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
    if (CommentWrapperRef.current) {
      CommentWrapperRef.current.scrollTop = 0;
      if (hasMore === false) {
        setHasMore((prev) => !prev);
      }
    }
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
    CommentWrapperRef,
  };
}

export default useComment;
