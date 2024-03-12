import { useMutation, useQueryClient } from '@tanstack/react-query';

import { request } from '@/apis/axios';
import { QUERY_KEYS } from '@/constants/QueryKey';
import { ErrorProps, SignupProps } from '@/types/api';

/** 회원가입 */
export const useSignup = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: SignupProps) => request.post('users', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.signUpData] });
    },
  });

  const errorObj = error as unknown as ErrorProps;
  const errorMessage = errorObj?.data?.message;

  return { mutate, isPending, isError, errorMessage };
};

/** 내 정보 조회 */
export const useGetMyInfo = () => {};

/** 내 정보 수정 */
export const useCorrectMyInfo = () => {};

/** 프로필 이미지 업로드 */
export const useProfileImgUpload = () => {};
