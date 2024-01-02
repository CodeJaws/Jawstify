import { create } from 'zustand';

interface Props {
  columnId: number;
  setColumnId: (columnId: number) => void;
}

const useColumnId = create<Props>((set) => ({
  columnId: 0,
  setColumnId: (value: number) => set({ columnId: value }),
}));

export default useColumnId;
