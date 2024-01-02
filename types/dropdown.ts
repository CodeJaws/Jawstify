export interface ModalDropdownProps {
  type: 'status' | 'manager';
  onChange: (inputLabel: string, inputValue: string) => void;
}
