import { useEffect, useState } from 'react';
import { FieldValues, Path, UseFormGetValues } from 'react-hook-form';

const useAuth = <T extends FieldValues>(getValues: UseFormGetValues<T>, inputValues: Path<T>[]) => {
  const initialErrorMsg = {
    serverMessage: '',
    noCheck: '',
  };
  const [alertMessage, setAlertMessage] = useState(initialErrorMsg);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const validateBtnActivation = () => {
    if (inputValues.every((value) => getValues(value))) setIsBtnActive(true);
    else setIsBtnActive(false);
  };

  const initServerAlertMessage = () => {
    alertMessage && setAlertMessage(initialErrorMsg);
  };

  const handleChange = () => {
    validateBtnActivation();
    initServerAlertMessage();
  };

  useEffect(() => {
    if (alertMessage.serverMessage) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [alertMessage.serverMessage]);

  return {
    alertMessage,
    setAlertMessage,
    isBtnActive,
    handleChange,
    isModalOpen,
    setIsModalOpen,
    isAgreeChecked,
    setIsAgreeChecked,
  };
};

export default useAuth;
