import { useRouter } from 'next/router'

function BoardID() {
  const router = useRouter()
  const { boardid: id } = router.query
  return <div>BoardID #{id} page</div>
}

export default BoardID
