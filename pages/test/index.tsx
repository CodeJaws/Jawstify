import DashBoardButton from '@/components/common/Button/DashBoardButton';
import ColumnAddButton from '@/components/common/Button/ColumnAddButton';
import DeleteButton from '@/components/common/Button/DeleteButton';
import LoginButton from '@/components/common/Button/LoginButton';
import DashBoardAddButton from '@/components/common/Button/DashBoardAddButton';
import AddButton from '@/components/common/Button/AddButton';
import PaginationButton from '@/components/common/Button/PaginationButton';
import styled from 'styled-components';
import Button from '@/components/common/Button/Button';
import TwinButton from '@/components/common/Button/TwinButton';

function TestPage() {
  return (
    <>
      <ButtonDiv>
        <LoginButton type="login" active={true} />
        <ColumnAddButton />
        <AddButton />
        <DeleteButton />
        <PaginationButton active={true} />
        <DashBoardAddButton />
        <DashBoardButton text="대시보드" color="green" king={true} />
        {/* size = large or small / isViolet은 보라색 배경 바꾸기 */}
        <Button size="small" isViolet={true} text="성공" />
        <TwinButton size="small" text1="수락" text2="거절" isViolet={false} />
      </ButtonDiv>
    </>
  );
}

export default TestPage;

const ButtonDiv = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
