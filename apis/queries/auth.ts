import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { request } from '@/apis/axios';
import { QUERY_KEYS } from '@/constants/QueryKey';
import { ErrorProps, LoginProps } from '@/types/api';

/** 로그인 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ email, password }: LoginProps) => {
      return request.post(`auth/login`, { email, password });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.loginData] });
      queryClient.setQueryData([QUERY_KEYS.loginData], data);
    },
  });

  const errorObj = error as unknown as ErrorProps;
  const errorMessage = errorObj?.data?.message;

  return { mutate, isPending, isError, errorMessage };
};

/** 비밀번호 변경 */
export const useChangePassword = () => {};
