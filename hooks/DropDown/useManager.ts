import { create } from 'zustand';

interface Props {
  manager: number;
  setManager: (e: number) => void;
}

const useManager = create<Props>((set) => ({
  manager: 0, // TODO: 이 부분 현재 로그인 된 유저 아이디로 가져오게 수정해야함
  setManager: (value: number) => set({ manager: value }),
}));

export default useManager;
