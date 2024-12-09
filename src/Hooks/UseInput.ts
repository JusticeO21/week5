import { useState } from 'react';
import globalState from '../AppState/GlobalState';

function useInput(initialValue: string, validations?: any) {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);

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
    const newValue = event.target.value;
    globalState.setState(`${event.target.name}`, newValue)
    globalState.storeData();
    setValue(newValue);
    validate(newValue); // validate each time the input changes
  };

  const setFieldReqiredError = ()=>{
    setErrors(["This field is required"])
  }

  return {
    value,
    errors,
    handleChange,
    setFieldReqiredError
  };
}
export default useInput;
