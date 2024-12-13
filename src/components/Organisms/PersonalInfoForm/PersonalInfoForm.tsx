import styles from "./PersonalInfoForm.module.css";
import FormPreview from "../../Atoms/FormPreview/FormPreview";
import Header from "../../Atoms/Header/Header";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import useInput from "../../../Hooks/UseInput";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useRedux";
import { goToNextStep } from "../../../Redux/sidebarSlice";
import { minLength, emailPattern, numberPattern, required  } from "./utils";
function PersonalInfoForm() {
  const { goToSelectedStep } = useCustomNavigate();
  const dispatch = useAppDispatch();
  const { name, mail, phone } = useAppSelector(state => state.personalInfo);

  const {
    value: nameValue,
    handleChange: handleNameChange,
    errors: nameErrors,
    setFieldReqiredError: setNameFieldRequired,
  } = useInput(name, [required, minLength(3)]);

  const {
    value: emailValue,
    handleChange: handleEmailChange,
    errors: emailErrors,
    setFieldReqiredError: setEmailFieldRequired,
  } = useInput(mail, [
    emailPattern,
    required,
    minLength(3),
  ]);
  
  const {
    value: phoneValue,
    handleChange: handlePhoneChange,
    errors: phoneErrors,
    setFieldReqiredError: setPhoneFieldRequired,
  } = useInput(phone, [
    numberPattern,
    required,
    minLength(3),
  ]);

  function handleSubmit() {
    !nameValue && setNameFieldRequired();
    !emailValue && setEmailFieldRequired();
    !phoneValue && setPhoneFieldRequired();
    if (
      !nameValue ||
      !emailErrors ||
      !phoneValue ||
      nameErrors[0] ||
      emailErrors[0] ||
      phoneErrors[0]
    )
      return;
    dispatch(goToNextStep());
    goToSelectedStep()
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
          name="mail"
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
