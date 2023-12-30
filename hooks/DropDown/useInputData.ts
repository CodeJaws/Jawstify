import { create } from 'zustand';

interface Props {
  inputData: string;
  setInputData: (inputData: string) => void;
}

const useInputData = create<Props>((set) => ({
  inputData: '',
  setInputData: (value: string) => set({ inputData: value }),
}));

export default useInputData;
