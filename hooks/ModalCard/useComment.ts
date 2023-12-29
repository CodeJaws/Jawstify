import { GetCommentListItem } from '@/types/api';
import { create } from 'zustand';

interface Props {
  comment: GetCommentListItem;
  setComment: (comment: GetCommentListItem) => void;
}

const useComment = create<Props>((set) => ({
  comment: {
    cursorId: 0,
    comments: [
      {
        id: 0,
        content: '',
        createdAt: '',
        updatedAt: '',
        cardId2: 0,
        author: {
          profileImageUrl: '',
          nickname: '',
          id: 0,
        },
      },
    ],
  },
  setComment: (value: GetCommentListItem) =>
    set((state) => ({
      comment: {
        ...state.comment,
        cursorId: value.cursorId,
        comments: value.comments,
      },
    })),
}));

export default useComment;
