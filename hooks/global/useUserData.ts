import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserType } from '@/types/apiType';

interface useUserDataProps {
  user: UserType;
  setUser: (value: UserType) => void;
}

const useUserData = create(
  persist<useUserDataProps>(
    (set) => ({
      user: {
        createdAt: '',
        email: '',
        id: 0,
        nickname: '',
        profileImageUrl: '',
        updatedAt: '',
      },
      setUser: (value: UserType) => set({ user: value }),
    }),
    {
      name: 'userDataStorage',
    },
  ),
);

export default useUserData;
