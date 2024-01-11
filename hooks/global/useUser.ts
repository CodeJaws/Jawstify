import API from '@/apis/api';
import useUserData from '@/hooks/global/useUserData';
import { UserType } from '@/types/apiType';

import { useEffect, useState } from 'react';

function useUser() {
  const { setUser: setUserData } = useUserData();
  let [user, setUser] = useState<UserType>();
  const fetchUserData = async () => {
    const res = await API.users.getMyInfo();
    setUser(res);
    setUserData(res);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return { user };
}

export default useUser;
