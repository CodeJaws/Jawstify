import { create } from 'zustand';

interface Props {
  dashboardId: number;
  setDashboardId: (dashboardId: number) => void;
}

const useDashBoardId = create<Props>((set) => ({
  dashboardId: 0,
  setDashboardId: (value: number) => set({ dashboardId: value }),
}));

export default useDashBoardId;
