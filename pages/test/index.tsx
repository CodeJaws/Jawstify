import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useState } from 'react';
import styled from 'styled-components';

/** Test용 Page입니다. */
function Test() {
  const [reset, setReset] = useState(false);

  const handleClick = () => {
    setReset((prev) => !prev);
  };
  return (
    <>
      <StyledContainer>
        <DashboardNavbar isMyDashboard={false} isOwner={true} title="내 대시보드" />
        <Sidebar reset={reset} setReset={setReset} boardId={340} />
      </StyledContainer>
      <Div>
        <button onClick={handleClick}>ddd</button>
      </Div>
    </>
  );
}

export default Test;

const StyledContainer = styled.div`
  width: 100%;
`;

const Div = styled.div`
  position: absolute;
  top: 70px;
  left: 300px;
  width: 100%;
  padding: 40px;
`;
