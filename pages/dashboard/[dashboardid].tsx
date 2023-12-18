import { useRouter } from 'next/router'

function DashBoardID() {
  const router = useRouter()
  const { dashboardid: id } = router.query
  return <div>DashBoardID #{id} page</div>
}

export default DashBoardID
