import styles from "./PersonalInfoForm.module.css";
import FormPreview from '../../Atoms/FormPreview/FormPreview';
import Header from '../../Atoms/Header/Header';
import Input from '../../Atoms/Input/Input';
import Button from '../../Atoms/Button/Button';
import useInput from '../../../Hooks/UseInput';
import globalState from '../../../AppState/GlobalState';

const required = (value: string) => value ? null : "This field is required";
const minLength = (min: number) => (value: string) => value.length >= min ? null : `Minimum length is ${min}`;
const maxLength = (max: number) => (value: string) => value.length <= max ? null : `Maximum length is ${max}`;
const emailPattern = (value: string) => /\S+@\S+\.\S+/.test(value) ? null : "Invalid email format";
const numberPattern = (value: string) => /^\+(\d{1,4})\s?(\d{1,4})\s?(\d{1,4})\s?(\d{1,4})$/.test(value) ? null : "Invalid mobile number format. Example: +1 234 567 890";


function PersonalInfoForm() {
  const { value : nameValue, handleChange : handleNameChange, errors : nameErrors,  setFieldReqiredError : setNameFieldRequired  } = useInput(globalState.getState("name") || "", [required]);
  const { value: emailValue, handleChange: handleEmailChange, errors : emailErrors, setFieldReqiredError : setEmailFieldRequired  } = useInput(globalState.getState("email") || "", [emailPattern, required]);
  const { value: phoneValue, handleChange: handlePhoneChange, errors: phoneErrors,  setFieldReqiredError : setPhoneFieldRequired} = useInput(globalState.getState("phone") || "", [numberPattern, required]);
  
  function handleSubmit() {
    !nameValue && setNameFieldRequired();
    !emailValue && setEmailFieldRequired();
    !phoneValue && setPhoneFieldRequired();
  }

  return (
    <>
      <Header
        stageHeader="Personal info"
        explainHeader="Pease provide your name, email address and phone number"
      />
      <FormPreview>
        <Input
          type="text"
          name="name"
          label="name"
          onChange={handleNameChange}
          value={nameValue}
          placeholder="e.g Justice Owusu"
          error={nameErrors[0] && nameErrors[0]}
        />
        <Input
          type="email"
          name="email"
          label="email address"
          onChange={handleEmailChange}
          value={emailValue}
          placeholder="e.g justice@gmail.com"
          error={emailErrors[0] && emailErrors[0]}
        />
        <Input
          type="phone"
          name="phone"
          label="phone number"
          onChange={handlePhoneChange}
          value={phoneValue}
          error={phoneErrors[0] && phoneErrors[0]}
          placeholder="+1 234 567 890"
        />
      </FormPreview>
      <span className={styles.buttons}>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          text="Next Step"
          positionButton="right"
        />
      </span>
    </>
  );
}

export default PersonalInfoForm;
