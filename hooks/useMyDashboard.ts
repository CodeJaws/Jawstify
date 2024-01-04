import { useState } from 'react';

function useMyDashboard() {
  const [resetToFirst, setResetToFirst] = useState(false);
  const [refreshPaginationToggle, setRefreshPaginationToggle] = useState(false);
  const refresh = () => setRefreshPaginationToggle((prev) => !prev);
  const refreshToFirst = () => setResetToFirst((prev) => !prev);
  return { refresh, resetToFirst, refreshPaginationToggle, refreshToFirst };
}

export default useMyDashboard;
