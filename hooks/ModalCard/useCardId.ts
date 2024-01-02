import { create } from 'zustand';

interface Props {
  cardId: number;
  setCardId: (inputData: number) => void;
}

const useCardId = create<Props>((set) => ({
  cardId: 0,
  setCardId: (value: number) => set({ cardId: value }),
}));

export default useCardId;
