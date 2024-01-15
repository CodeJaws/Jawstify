import { handleReactQueryError } from '@/lib/toast';
import {
  CheckCardListProps,
  CorrectCardProps,
  CreateCardProps,
  CreateColumnProps,
  CreateDashboardProps,
  DeleteCardProps,
  GetCardDetailsProps,
} from '@/types/api';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ErrorProps } from '@/types/api';
import { request } from '../axios';
import useCardId from '@/hooks/ModalCard/useCardId';
import API from '../api';
import useColumnId from '@/hooks/ModalCard/useColumnId';

/** 카드 생성 */
export const useCreateCard = () => {
  const queryClient = useQueryClient();
  const { columnId } = useColumnId();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCardProps) => request.post('cards', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card', columnId] });
      console.log('카드 생성 완료');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 카드 목록 조회 */
export const useCheckCardList = ({ size, cursorId, columnId }: CheckCardListProps) => {
  const { data: columnCardList } = useQuery({
    queryKey: ['card', columnId],
    queryFn: async () => {
      return await API.cards.checkCardList({ size, cursorId, columnId });
    },
    // enabled: !!cardId,
  });

  return { columnCardList };
};

/** 카드 수정 */
export const useCorrectCard = () => {
  const queryClient = useQueryClient();
  const { cardId } = useCardId();
  const { columnId } = useColumnId();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ cardId, columnId, assigneeUserId, title, description, dueDate, tags, imageUrl }: CorrectCardProps) =>
      request.put(`cards/${cardId}`, {
        cardId,
        columnId,
        assigneeUserId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      }),
    // mutationFn: API.cards.correctCard({})
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card', columnId, cardId] });
      console.log('카드 수정 완료');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 카드 상세 조회 */
export const useGetCardDetails = () => {
  const { cardId } = useCardId();
  const { columnId } = useColumnId();

  const { data: cardData } = useQuery({
    queryKey: ['card', columnId, cardId],
    queryFn: async () => {
      return await API.cards.getCardDetails({ cardId });
    },
    enabled: !!cardId,
  });

  return { cardData };
};

/** 카드 삭제 */
export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  const { columnId } = useColumnId();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ cardId }: DeleteCardProps) => request.delete(`cards/${cardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card', columnId] });
      console.log('카드 삭제 완료');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};
