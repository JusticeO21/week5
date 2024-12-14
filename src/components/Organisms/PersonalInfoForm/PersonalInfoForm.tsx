import styles from "./PersonalInfoForm.module.css";
import FormPreview from '../../Atoms/FormPreview/FormPreview';
import Header from '../../Atoms/Header/Header';
import Input from '../../Atoms/Input/Input';
import Button from '../../Atoms/Button/Button';
import useInput from '../../../Hooks/UseInput';
import globalState from '../../../AppState/GlobalState';
import useCustomNavigate from "../../../Hooks/UseNavigate";
import useAppContext from "../../../Hooks/useAppContext";

// Validation functions
function required(value: string) {
  return value ? null : "This field is required";
}

function minLength(min: number) {
  return function(value: string) {
    return value.length >= min ? null : `Minimum length is ${min}`;
  };
}

function emailPattern(value: string) {
  return /\S+@\S+\.\S+/.test(value) ? null : "Invalid email format";
}

function numberPattern(value: string) {
  return /^\+(\d{1,4})\s?(\d{1,4})\s?(\d{1,4})\s?(\d{1,4})$/.test(value) ? null : "Invalid mobile number format. Example: +1 234 567 890";
}

function PersonalInfoForm() {
  const { goTo } = useCustomNavigate();
  const { updateStage } = useAppContext();

  // Hooks for form fields and validation
  const { value: nameValue, handleChange: handleNameChange, errors: nameErrors, setFieldReqiredError: setNameFieldRequired } = useInput(globalState.getState("name") || "", [required, minLength(3)]);
  const { value: emailValue, handleChange: handleEmailChange, errors: emailErrors, setFieldReqiredError: setEmailFieldRequired } = useInput(globalState.getState("email") || "", [emailPattern, required, minLength(3)]);
  const { value: phoneValue, handleChange: handlePhoneChange, errors: phoneErrors, setFieldReqiredError: setPhoneFieldRequired } = useInput(globalState.getState("phone") || "", [numberPattern, required, minLength(3)]);

  function handleSubmit() {
    if (!nameValue) setNameFieldRequired();
    if (!emailValue) setEmailFieldRequired();
    if (!phoneValue) setPhoneFieldRequired();

    if (!nameValue || !emailValue || !phoneValue || nameErrors[0] || emailErrors[0] || phoneErrors[0]) return;

    goTo("/register/select-plan");
    updateStage(1);
    globalState.setState("stage", 1);
    globalState.storeData();
  }

  return (
    <>
      <Header
        stageHeader="Personal info"
        explainHeader="Please provide your name, email address, and phone number"
      />
      <FormPreview>
        <Input
          type="text"
          name="name"
          label="Name"
          onChange={handleNameChange}
          value={nameValue}
          placeholder="e.g. Justice Owusu"
          error={nameErrors[0]}
        />
        <Input
          type="email"
          name="email"
          label="Email Address"
          onChange={handleEmailChange}
          value={emailValue}
          placeholder="e.g. justice@gmail.com"
          error={emailErrors[0]}
        />
        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          onChange={handlePhoneChange}
          value={phoneValue}
          placeholder="+1 234 567 890"
          error={phoneErrors[0]}
        />
      </FormPreview>
      <span className={styles.buttons}>
        <Button
          onClick={handleSubmit}
          text="Next Step"
          positionButton="right"
        />
      </span>
    </>
  );
}

export default PersonalInfoForm;
