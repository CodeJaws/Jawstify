import { GetCardDetailsItem } from '@/types/api';
import { create } from 'zustand';

interface Props {
  cardData: GetCardDetailsItem;
  setCardData: (cardData: GetCardDetailsItem) => void;
}

const useCardData = create<Props>((set) => ({
  cardData: {
    id: 0,
    title: '',
    description: '',
    tags: [],
    dueDate: '',
    assignee: {
      profileImageUrl: '',
      nickname: '',
      id: 0,
    },
    imageUrl: '',
    teamId: '',
    columnId: 0,
    dashboardId: 0,
    createdAt: '',
    updatedAt: '',
  },
  setCardData: (value: GetCardDetailsItem) =>
    set({
      cardData: {
        id: value.id,
        title: value.title,
        description: value.description,
        tags: value.tags,
        dueDate: value.dueDate,
        assignee: {
          profileImageUrl: value.assignee.profileImageUrl,
          nickname: value.assignee.nickname,
          id: value.assignee.id,
        },
        imageUrl: value.imageUrl,
        teamId: value.teamId,
        columnId: value.columnId,
        dashboardId: value.dashboardId,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      },
    }),
}));

export default useCardData;
