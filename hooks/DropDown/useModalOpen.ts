import { create } from 'zustand';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (refrisModalOpenesh: boolean) => void;
}

const useModalOpen = create<Props>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
}));

export default useModalOpen;
