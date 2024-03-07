import API from '@/apis/api';
import { getCookie } from 'cookies-next';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const useRedirectByLogin = () => {
  const router = useRouter();
  const checkLoggedIn = async () => {
    if (!getCookie('accessToken')) return false;
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
            toast('이미 로그인한 상태입니다.', { icon: '🦈' });
            router.push('/mydashboard');
          }
          break;
        default:
          if (!(await checkLoggedIn())) {
            toast.error('로그인 후 이용해주세요.');
            router.push('/');
          }
      }
    };
    fetchData();
  }, [router]);

  return;
};

export default useRedirectByLogin;
