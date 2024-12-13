import styles from "./AddOnsForm.module.css"
import FormPreview from '../../Atoms/FormPreview/FormPreview';
import Input from '../../Atoms/Input/Input';
import Button from '../../Atoms/Button/Button';
import Header from '../../Atoms/Header/Header';
import { useState } from 'react';
import globalState from '../../../AppState/GlobalState';
import useCustomNavigate from '../../../Hooks/UseNavigate';


function AddOnsForm() {
  const [selectedCheckbox, setSelectedCheckbox] = useState<{ [key: string]: string }>({});
  const addOns = globalState.getState("addOns");
  const month = false;
  const {goTo} = useCustomNavigate()

  function handleCheckboxChange(e:React.ChangeEvent<HTMLInputElement> ,checkboxName:string, cost:number) {
    const addOns = globalState.getState("addOns") || {};
    if (e.target.checked) {
      setSelectedCheckbox((prev) => ({ ...prev, [checkboxName]: "checked" }));
      addOns[checkboxName] = cost;
    } else {
      setSelectedCheckbox((prev) => ({ ...prev, [checkboxName]: "" }));
      delete addOns[checkboxName]
    }
    globalState.setState("addOns", addOns);
    globalState.storeData();
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
            handleCheckboxChange(e, "online_service", 1);
          }}
          label="online service"
          value=""
          name="online_service"
          active={selectedCheckbox["online_service"]}
          cost={!month ? "10yr" : "1/mo"}
          checked={addOns?.["online_service"] ? true : false}
        />
        
        <Input
          type="checkbox"
          onChange={(e) => {
            handleCheckboxChange(e, "larger_storage", !month ? 30 : 3);
          }}
          label="larger storage"
          value=""
          name="larger_storage"
          active={selectedCheckbox["larger_storage"]}
          cost={!month ? "30yr" : "3/mo"}
          checked={addOns?.["larger_storage"] ? true : false}
        />

        <Input
          type="checkbox"
          onChange={(e) => {
            handleCheckboxChange(e, "customizable_profile", !month ? 10 : 1);
          }}
          label="customizable profile"
          value=""
          name="customizable_profile"
          active={selectedCheckbox["customizable_profile"]}
          cost={!month ? "10yr" : "1/mo"}
          checked={addOns?.["customizable_profile"] ? true : false}
        />
      </FormPreview>

      <span className={styles.buttons}>
        <Button
          text="go back"
          onClick={(e) => {
            e.preventDefault();
            goTo("/register/select-plan");
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
            globalState.setState("stage", 3)
            globalState.storeData();
          }}
        />
      </span>
    </>
  );
}

export default AddOnsForm
