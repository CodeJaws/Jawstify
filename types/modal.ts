import { ChangeEvent } from 'react';

export interface ModalOnClickProps {
  onOkClick: () => void;
  onCancelClick: () => void;
}

export type InputChangeType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
