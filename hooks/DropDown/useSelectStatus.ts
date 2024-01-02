import { create } from 'zustand';

interface Props {
  status: string;
  setStatus: (status: string) => void;
}

const useSelectStatus = create<Props>((set) => ({
  status: '',
  setStatus: (value: string) => set({ status: value }),
}));

export default useSelectStatus;
