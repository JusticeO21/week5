import { useState } from 'react';
import { useAppDispatch } from './useRedux';
import { updatePersonalInfo } from '../Redux/personalInfoSlice';

function useInput(initialValue: string, validations?: any) {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const validate = (value: string) => {
    const newErrors: string[] = [];

    for (const validation of validations) {
      const error = validation(value);
      if (error) {
        newErrors.push(error);
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    dispatch(updatePersonalInfo({[event.target.name]:newValue}));
    setValue(newValue);
    validate(newValue); // validate each time the input changes
  };

  const setFieldReqiredError = ()=>{
    setErrors(["This field is required"])
  }

  const resetInput = () => {
    setValue("")
  }

  return {
    value,
    errors,
    handleChange,
    setFieldReqiredError,
    resetInput
  };
}
export default useInput;
