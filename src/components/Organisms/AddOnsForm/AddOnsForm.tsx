import styles from "./AddOnsForm.module.css";
import FormPreview from "../../Atoms/FormPreview/FormPreview";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Header from "../../Atoms/Header/Header";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useRedux";
import { updateAddOns, removeAddOn } from "../../../Redux/PlanAndAddOnSlice";
import { goToNextStep, goBack } from "../../../Redux/sidebarSlice";
import useCustomNavigate from "../../../Hooks/UseNavigate";

function AddOnsForm() {
  const { addOns, isAYearPlan } = useAppSelector((state) => state.planAndAddOns);
  const dispatch = useAppDispatch();
  const month = false; 
  const { goToSelectedStep } = useCustomNavigate();

  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    checkboxName: string,
    cost: number
  ) {
    if (e.target.checked) {
      dispatch(updateAddOns({ [`${checkboxName}`] : cost }));
    } else {
      dispatch(removeAddOn(checkboxName));
    }
  }

  function handleNextButtonClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    dispatch(goToNextStep());
    goToSelectedStep();
  }

  function handleBackButtonClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    dispatch(goBack());
    goToSelectedStep();
  }

  return (
    <>
      <Header
        stageHeader="Pick add-ons"
        explainHeader="Add-ons help enhance your gaming experience"
      />
      <FormPreview>
        <Input
          type="checkbox"
          onChange={(e) => {
            handleCheckboxChange(e, "online_service", isAYearPlan ? 10 : 1);
          }}
          label="online service"
          value=""
          name="online_service"
          cost={isAYearPlan ? "10yr" : "1/mo"}
          checked={!!addOns?.["online_service"]}
        />

        <Input
          type="checkbox"
          onChange={(e) => {
            handleCheckboxChange(e, "larger_storage", isAYearPlan ? 30 : 3);
          }}
          label="larger storage"
          value=""
          name="larger_storage"
          cost={isAYearPlan ? "30yr" : "3/mo"}
          checked={!!addOns?.["larger_storage"]}
        />

        <Input
          type="checkbox"
          onChange={(e) => {
            handleCheckboxChange(e, "customizable_profile", isAYearPlan ? 10 : 1);
          }}
          label="customizable profile"
          value=""
          name="customizable_profile"
          cost={!month ? "10yr" : "1/mo"}
          checked={!!addOns?.["customizable_profile"]}
        />
      </FormPreview>

      <span className={styles.buttons}>
        <Button text="go back" onClick={handleBackButtonClick} />

        <Button
          positionButton="right"
          text="next step"
          onClick={handleNextButtonClick}
        />
      </span>
    </>
  );
}

export default AddOnsForm;
