import SidebarButton from '@/components/common/Button/SidebarButton'
import ColumnAddButton from '@/components/common/Button/ColumnAddButton'
import DeleteButton from '@/components/common/Button/DeleteButton'
import LoginButton from '@/components/common/Button/LoginButton'
import DashBoardAddButton from '@/components/common/Button/DashBoardAddButton'
import AddButton from '@/components/common/Button/AddButton'
import PaginationButton from '@/components/common/Button/PaginationButton'
import styled from 'styled-components'
import Button from '@/components/common/Button/Button'
import TwinButton from '@/components/common/Button/TwinButton'

function ButtonPage() {
  return (
    <Div>
      <LoginButton active={true} />
      <ColumnAddButton />
      <AddButton />
      <DeleteButton />
      <PaginationButton active={true} />
      <DashBoardAddButton />
      <SidebarButton />
      <Button size="small" isViolet={true} text="성공" />
      <TwinButton size="large" text1="수락" text2="거절" isViolet={false} />
    </Div>
  )
}

export default ButtonPage

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const DivTest = styled.div`
  width: 300px;
  height: 100px;
  border: solid 1px #d9d9d9;
`
