import FormInput from '@/components/Input/FormInput';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import TagInput from '@/components/Input/ModalInputContainer/TagInput';
import DateInput from '@/components/Input/ModalInputContainer/DateInput';
import Modal from '@/components/Modal/Modal';
import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import styled from 'styled-components';

/** Test용 Page입니다. */
function Test() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <BasicInput isTextArea label="댓글"></BasicInput>
      <button></button>
      <But
        onClick={() => {
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <Modal
          content={null}
          description="컬럼의 모든 카드가 삭제됩니다."
          handleCancelClick={() => {
            console.log('취소');
            setIsOpen(false);
          }}
          handleOKClick={() => {
            console.log('확인');
          }}
        />
      )}
    </div>
  );
}

export default Test;

const But = styled.button`
  width: 200px;
  height: 200px;
  background-color: aliceblue;
`;
