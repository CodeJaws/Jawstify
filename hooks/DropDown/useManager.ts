import { create } from 'zustand';

interface Props {
  manager: number | null;
  setManager: (e: number) => void;
}

const useManager = create<Props>((set) => ({
  manager: null,
  setManager: (value: number) => set({ manager: value }),
}));

export default useManager;
