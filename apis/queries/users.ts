import useColumnId from '@/hooks/ModalCard/useColumnId';
import { ErrorProps, SignupProps } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../axios';
import { handleReactQueryError } from '@/lib/toast';

/** 회원가입 */
export const useSignup = (email: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: SignupProps) => request.post('users', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signUpData', email] });
      console.log('회원가입 완료!');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 내 정보 조회 */
export const useGetMyInfo = () => {};

/** 내 정보 수정 */
export const useCorrectMyInfo = () => {};

/** 프로필 이미지 업로드 */
export const useProfileImgUpload = () => {};
