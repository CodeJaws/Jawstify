import Input from '@/components/Input/ModalInput'
import ModalInput from '@/components/Input/ModalInput'
import Comment from '@/components/Input/ModalInputContainer/Comment'
import DatePicker from '@/components/Input/ModalInputContainer/Date'
import Date from '@/components/Input/ModalInputContainer/Date'

function Landing() {
  return (
    <div>
      <ModalInput label="비밀번호" isNecessary></ModalInput>
      <Input label="비밀번호 확인"></Input>
      <Input label="로그인"></Input>
      <Comment label="댓글" />
      <DatePicker />
    </div>
  )
}

export default Landing
