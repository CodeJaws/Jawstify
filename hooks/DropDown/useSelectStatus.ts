import { TO_DO } from '@/constants/Chip';
import { create } from 'zustand';

interface Props {
  status: string;
  setStatus: (status: string) => void;
}

const useSelectStatus = create<Props>((set) => ({
  status: TO_DO,
  setStatus: (value: string) => set({ status: value }),
}));

export default useSelectStatus;
