import FormInput from '@/components/Input/FormInput';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TagInput from '@/components/Input/ModalInputContainer/TagInput';
import DateInput from '@/components/Input/ModalInputContainer/DateInput';

/** Test용 Page입니다. */
function Test() {
  return (
    <div>
      <h4>Modal text inputs</h4>

      {/* modal text inputs */}
      <BasicInput label="제목" isNecessary></BasicInput>
      <BasicInput label="설명" isNecessary isTextArea></BasicInput>
      <BasicInput label="이름" placeholder="새로운 프로젝트"></BasicInput>
      <TagInput />
      <DateInput />

      <h4>Form text inputs</h4>

      {/* form text inputs */}
      <FormInput label="이메일"></FormInput>
      <FormInput label="닉네임"></FormInput>
      <FormInput label="비밀번호"></FormInput>
      <FormInput label="비밀번호 확인"></FormInput>
    </div>
  );
}

export default Test;
