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

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ email, password }: LoginProps) => {
      return request.post(`auth/login`, { email, password });
    },
    onSuccess: (data) => {
      // TODO: user별로 쿼리 키 세분화하기
      queryClient.invalidateQueries({ queryKey: ['loginData'] });
      queryClient.setQueryData(['loginData'], data);
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 비밀번호 변경 */
export const useChangePassword = () => {};
