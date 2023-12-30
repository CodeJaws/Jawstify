import { GetMembersInDashboardItem } from '@/types/api';
import { create } from 'zustand';

type Props = {
  members: GetMembersInDashboardItem;
  setMembers: (members: GetMembersInDashboardItem) => void;
};

const useGetMember = create<Props>((set) => ({
  members: {
    members: [
      {
        id: 0,
        userId: 0,
        email: '',
        nickname: '',
        profileImageUrl: '',
        createdAt: '',
        updatedAt: '',
        isOwner: false,
      },
    ],
    totalCount: 0,
  },
  setMembers: (value: GetMembersInDashboardItem) =>
    set((state) => ({
      members: {
        ...state.members,
        members: value.members,
      },
      totalCount: value.totalCount,
    })),
}));
export default useGetMember;
