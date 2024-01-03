import API from '@/apis/api';
import { localStorageGetItem } from '@/utils/localStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRedirectByLogin = () => {
  const router = useRouter();
  const checkLoggedIn = async () => {
    if (!localStorageGetItem('accessToken')) return false;
    try {
      await API.users.getMyInfo();
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      switch (router.pathname) {
        case '/':
        case '/login':
        case '/signup':
          if (await checkLoggedIn()) {
            alert('이미 로그인한 상태입니다.');
            router.push('/mydashboard');
          }
          break;
        default:
          if (!(await checkLoggedIn())) {
            alert('로그인 후 이용해주세요.');
            router.push('/');
          }
      }
    };
    fetchData();
  }, [router]);

  return;
};

export default useRedirectByLogin;
