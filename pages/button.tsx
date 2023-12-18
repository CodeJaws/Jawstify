import BeBridgeButton from '@/components/common/Button/BeBridgeButton'
import ColumnPlusButton from '@/components/common/Button/ColumnPlusButton'
import DashBoardDeleteButton from '@/components/common/Button/DashBoardDeleteButton'
import DeleteButton from '@/components/common/Button/DeleteButton'
import ExpressButton from '@/components/common/Button/ExpressButton'
import LoginButton from '@/components/common/Button/LoginButton'
import NewDashBoardButton from '@/components/common/Button/NewDashBoardButton'
import PlusButton from '@/components/common/Button/PlusButton'
import styled from 'styled-components'

function ButtonPage() {
  return (
    <Div>
      <LoginButton active={true} />
      <ExpressButton />
      <DeleteButton />
      <ColumnPlusButton />
      <PlusButton />
      <DashBoardDeleteButton />
      <NewDashBoardButton />
      <BeBridgeButton />
    </Div>
  )
}

export default ButtonPage

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
