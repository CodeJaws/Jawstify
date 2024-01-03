import { create } from 'zustand';

interface Props {
  isCardOpen: boolean;
  setIsCardOpen: (isCardOpen: boolean) => void;
}

const useCardOpen = create<Props>((set) => ({
  isCardOpen: false,
  setIsCardOpen: (value: boolean) => set({ isCardOpen: value }),
}));

export default useCardOpen;
