import { create } from 'zustand';

import { LoginItem } from '@/types/api';

export type UserType = LoginItem['user'];

interface useUserDataProps {
  user: UserType;
  setUser: (value: UserType) => void;
}

const useUserData = create<useUserDataProps>((set) => ({
  user: {
    createdAt: '',
    email: '',
    id: 0,
    nickname: '',
    profileImageUrl: '',
    updatedAt: '',
  },
  setUser: (value: UserType) => set({ user: value }),
}));

export default useUserData;
