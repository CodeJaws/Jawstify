import { useState } from 'react';

function useMyDashboard() {
  const [resetToFirst, setResetToFirst] = useState(false);
  const [refreshPaginationToggle, setRefreshPaginationToggle] = useState(false);
  const [reset, setReset] = useState(false);
  const refresh = () => setRefreshPaginationToggle((prev) => !prev);
  const refreshToFirst = () => setResetToFirst((prev) => !prev);
  return { reset, setReset, refresh, resetToFirst, refreshPaginationToggle, refreshToFirst };
}

export default useMyDashboard;
