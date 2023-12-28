import { useState } from 'react';
import { FieldValues, Path, UseFormGetValues } from 'react-hook-form';

const useAuth = <T extends FieldValues>(
  initialErrorMsg: string | object,
  getValues: UseFormGetValues<T>,
  inputValues: Path<T>[],
) => {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg);

  const validateBtnActivation = () => {
    if (inputValues.every((value) => getValues(value))) setIsBtnActive(true);
    else setIsBtnActive(false);
  };

  const initServerErrorMsg = () => {
    errorMsg && setErrorMsg(initialErrorMsg);
  };

  const handleChange = () => {
    validateBtnActivation();
    initServerErrorMsg();
  };

  return { errorMsg, setErrorMsg, isBtnActive, handleChange };
};

export default useAuth;
