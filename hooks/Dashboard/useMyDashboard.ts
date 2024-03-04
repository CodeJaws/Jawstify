import { useState } from 'react';

function useMyDashboard() {
  const [resetToFirst, setResetToFirst] = useState(false);
  const refreshToFirst = () => setResetToFirst((prev) => !prev);
  return { resetToFirst, refreshToFirst };
}

export default useMyDashboard;
