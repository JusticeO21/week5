import styles from "./AddOnsForm.module.css";
import FormPreview from "../../Atoms/FormPreview/FormPreview";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Header from "../../Atoms/Header/Header";
import { useState } from "react";
import globalState from "../../../AppState/GlobalState";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import useAppContext from "../../../Hooks/useAppContext";

function AddOnsForm() {
  const [selectedCheckbox, setSelectedCheckbox] = useState<{
    [key: string]: string;
  }>({});
  const { updateStage } = useAppContext();
  const addOns = globalState.getState("addOns");
  const month = false; // Hardcoded as per original code, could be dynamic if needed
  const { goTo } = useCustomNavigate();

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkboxName: string,
    cost: number
  ) => {
    const updatedAddOns = { ...globalState.getState("addOns") };

    if (e.target.checked) {
      setSelectedCheckbox((prev) => ({ ...prev, [checkboxName]: "checked" }));
      updatedAddOns[checkboxName] = cost;
    } else {
      setSelectedCheckbox((prev) => ({ ...prev, [checkboxName]: "" }));
      delete updatedAddOns[checkboxName];
    }

    globalState.setState("addOns", updatedAddOns);
    globalState.storeData();
  };

  return (
    <>
      <Header
        stageHeader="Pick add-ons"
        explainHeader="Add-ons help enhance your gaming experience"
      />

      <FormPreview>
        {["online_service", "larger_storage", "customizable_profile"].map(
          (addon) => {
            const cost =
              addon === "online_service"
                ? !month
                  ? 10
                  : 1
                : addon === "larger_storage"
                ? !month
                  ? 30
                  : 3
                : !month
                ? 10
                : 1;

            return (
              <Input
                key={addon}
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, addon, cost)}
                label={addon.replace("_", " ")}
                value=""
                name={addon}
                active={selectedCheckbox[addon]}
                cost={!month ? `${cost}yr` : `${cost}/mo`}
                checked={addOns?.[addon] ? true : false}
              />
            );
          }
        )}
      </FormPreview>

      <span className={styles.buttons}>
        <Button
          text="go back"
          onClick={(e) => {
            e.preventDefault();
            goTo("/register/select-plan");
            updateStage(1);
            globalState.setState("stage", 1);
            globalState.storeData();
          }}
        />

        <Button
          positionButton="right"
          text="next step"
          onClick={(e) => {
            e.preventDefault();
            goTo("/register/finishing-up");
            updateStage(3);
            globalState.setState("stage", 3);
            globalState.storeData();
          }}
        />
      </span>
    </>
  );
}

export default AddOnsForm;
