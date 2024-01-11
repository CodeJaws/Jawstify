import API from '@/apis/api';
import { GetCardDetailsItem } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import useCardId from './ModalCard/useCardId';
import useDashBoardId from './ModalCard/useDashBoardId';

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
  const [comment, setComment] = useState<Props[] | undefined>([]);
  const [cursorId, setCursorId] = useState<number | undefined | null>(0);
  const [hasMore, setHasMore] = useState(true);
  const [isUpdateMap, setIsUpdateMap] = useState<{ [key: number]: boolean }>({});
  const [updatedCommentMap, setUpdatedCommentMap] = useState<{ [key: number]: string }>({});
  const [value, setValues] = useState('');

  const { cardId } = useCardId();
  const { dashboardId } = useDashBoardId();

  const queryClient = useQueryClient();
  const card = queryClient.getQueryData(['card', cardId]);
  const cardData = card as GetCardDetailsItem;

  const CommentWrapperRef = useRef<HTMLDivElement>(null);

  const isOpenComment = (commentId: number) => {
    const commentArray = commentData?.comments.filter((val) => val.id === commentId).map((val) => val.content);
    const comment = commentArray?.toString() as string;
    setUpdatedCommentMap((prev) => ({ ...prev, [commentId]: comment }));
    setIsUpdateMap((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleUpdateInputChange = (commentId: number, e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedCommentMap((prev) => ({ ...prev, [commentId]: e.target.value }));
  };

  const handleChange = (e: string) => {
    setValues(e);
  };

  const { data: commentData } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      return await API.comments.getCommentList({ size: 3, cardId });
    },
  });

  const loadComment = useCallback(() => {
    setComment(commentData?.comments);
    setCursorId(commentData?.cursorId);
  }, [commentData?.comments, commentData?.cursorId]);

  const submitComment = useMutation({
    mutationFn: async () => {
      const body = {
        content: value,
        cardId: cardId,
        columnId: cardData.columnId,
        dashboardId: dashboardId,
      };
      await API.comments.createComment(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      toast.success('댓글 보내기 성공');
      setValues('');
    },
    onError: () => toast.error('댓글 보내기 실패'),
  });

  const updateComment = useMutation({
    mutationFn: async (commentId: number) => {
      const content = updatedCommentMap[commentId];
      setIsUpdateMap((prev) => ({ ...prev, [commentId]: false }));
      await API.comments.correctComment({ commentId, content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      toast.success('댓글 수정 완료');
    },
    onError: () => toast.error('댓글 수정 실패'),
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId: number) => {
      if (confirm('댓글을 삭제 하시겠습니까?')) await API.comments.deleteComment({ commentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      toast('댓글 삭제 성공', { icon: '❌' });
    },
    onError: () => toast.error('댓글 삭제 실패'),
  });

  const fetchHasMore = () => {
    if (cursorId) {
      if (comment?.length !== 0) {
        loadCommentMore();
      }
    } else {
      setHasMore(true);
    }
  };

  const loadCommentMore = async () => {
    const response = await API.comments.getCommentList({ cardId, cursorId });
    setComment((prev) => [...prev!, ...response.comments]);
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
  }, [commentData, hasMore, loadComment]);

  return {
    value,
    comment,
    hasMore,
    isUpdateMap,
    updatedCommentMap,
    isOpenComment,
    handleUpdateInputChange,
    updateComment,
    handleChange,
    submitComment,
    deleteComment,
    fetchHasMore,
    CommentWrapperRef,
  };
}

export default useComment;
