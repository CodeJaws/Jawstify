import { ChangeEvent } from 'react';

/**
 * @param onOkClick 모달 확인 버튼 onClick Handler
 * @param onCancelClick 모달 취소 버튼 onClick Handler
 * @param getValue 현재 컴포넌트에서 부모 컴포넌트로 선택된 값 넘겨 보낼 부모 컴포넌트의 함수
 */
export interface ModalCommonProps {
  onOkClick: () => void;
  onCancelClick: () => void;
  getValue?: (value: any) => void;
}

export type InputChangeType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
