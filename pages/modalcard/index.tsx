import API from '@/apis/api';
import ModalCard from '@/components/ModalCard/ModalCard';
import useGetMember from '@/hooks/DropDown/useGetMember';
import useCardData from '@/hooks/ModalCard/useCardData';
import useCardId from '@/hooks/ModalCard/useCardId';
import useComment from '@/hooks/ModalCard/useComment';
import useDashBoard from '@/hooks/ModalCard/useDashBoard';
import useRefresh from '@/hooks/useRefresh';
import { useEffect } from 'react';

// @TODO 카드 번호 필요 (zustand로 관리하면 될 듯)
const cardId = 328;
const size = 10;
const dashboardId = 325;

function ModalCardTest() {
  const { cardData, setCardData } = useCardData();
  const { setCardId } = useCardId();
  const { setTasks } = useDashBoard();
  const { setMembers } = useGetMember();
  const { comment, setComment } = useComment();
  const { refresh } = useRefresh();

  const testAPI = async () => {
    const test = await API.cards.getCardDetails({ cardId });
    const comment = await API.comments.getCommentList({ size, cardId });

    const dashBoard = await API.columns.getColumnList({ dashboardId });
    const getMember = await API.members.getMembersInDashboard({ dashboardId });

    setTasks(dashBoard);
    setCardData(test);
    setComment(comment);
    setCardId(cardId);
    setMembers(getMember);
  };

  useEffect(() => {
    testAPI();
  }, [refresh]);

  return <ModalCard />;
}

export default ModalCardTest;
