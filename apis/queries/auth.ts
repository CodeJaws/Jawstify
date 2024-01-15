import { handleReactQueryError } from '@/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorProps } from '@/types/api';
import { useRouter } from 'next/router';
import { request } from '../axios';
import { LoginProps } from '@/types/api';

/** 로그인 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: ({ email, password }: LoginProps) => {
      return request.post(`auth/login`, { email, password });
    },
    onSuccess: () => {
      // user별로 세분화시키기
      queryClient.invalidateQueries({ queryKey: ['loginData'] });
      alert('로그인 성공!');
      router.push('mydashboard');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error, data };
};

/** 비밀번호 변경 */
export const useChangePassword = () => {};
