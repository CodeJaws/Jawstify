import { create } from 'zustand';

interface Props {
  imgSrc: string;
  setImgSrc: (inputData: string) => void;
}

const useImgSrc = create<Props>((set) => ({
  imgSrc: '',
  setImgSrc: (value: string) => set({ imgSrc: value }),
}));

export default useImgSrc;
