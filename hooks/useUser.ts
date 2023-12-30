import API from '@/apis/api';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/apiType';

function useUser() {
  let [user, setUser] = useState<UserType>();
  const fetchUserData = async () => {
    const res = await API.users.getMyInfo();
    setUser(res);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return { user };
}

export default useUser;
