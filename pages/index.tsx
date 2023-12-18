import Input from '@/components/Input/ModalInput'
import ModalInput from '@/components/Input/ModalInput'

function Landing() {
  return (
    <div>
      <ModalInput label="비밀번호" isNecessary></ModalInput>
      <Input label="비밀번호 확인"></Input>
      <Input label="로그인"></Input>
    </div>
  )
}

export default Landing
