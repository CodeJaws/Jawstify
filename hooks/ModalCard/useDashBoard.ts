import { GetColumnListItem } from '@/types/api';
import { create } from 'zustand';

interface Props {
  tasks: GetColumnListItem;
  setTasks: (tasks: GetColumnListItem) => void;
}

const useDashBoard = create<Props>((set) => ({
  tasks: {
    result: 'SUCCESS',
    data: [
      {
        id: 0,
        title: '',
        teamId: '',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  setTasks: (value: GetColumnListItem) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        result: value.result,
        data: value.data,
      },
    })),
}));

export default useDashBoard;
