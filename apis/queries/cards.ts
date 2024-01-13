import useCardId from '@/hooks/ModalCard/useCardId';
import { useQuery } from '@tanstack/react-query';
import API from '../api';

/** 카드 생성 */
export const useCreateCard = () => {};

/** 카드 목록 조회 */
export const useCheckCardList = () => {};

/** 카드 수정 */
export const useCorrectCard = () => {};

/** 카드 상세 조회 */
export const useGetCardDetails = () => {
  const { cardId } = useCardId();
  const { data: cardData } = useQuery({
    queryKey: ['card', cardId],
    queryFn: async () => {
      return await API.cards.getCardDetails({ cardId });
    },
    enabled: !!cardId,
  });

  return { cardData };
};
