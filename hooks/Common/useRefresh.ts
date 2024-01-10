import { create } from 'zustand';

interface Props {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const useRefresh = create<Props>((set) => ({
  refresh: false,
  setRefresh: (value: boolean) => set({ refresh: value }),
}));

export default useRefresh;
