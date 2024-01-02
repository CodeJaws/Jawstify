import { create } from 'zustand';

interface Props {
  manager: number;
  setManager: (e: number) => void;
}

const useManager = create<Props>((set) => ({
  manager: 0,
  setManager: (value: number) => set({ manager: value }),
}));

export default useManager;
