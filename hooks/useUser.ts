import API from '@/apis/api';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/apiType';
import useUserData from './global/useUserData';

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
