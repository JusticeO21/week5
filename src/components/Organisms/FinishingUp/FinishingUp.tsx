import Header from "../../Atoms/Header/Header";
import SelectedPlan from "../../Atoms/SelectedPlan/SelectedPlan";
import styles from "./FinishinUp.module.css";
import globalState from "../../../AppState/GlobalState";
import { useState, useEffect } from "react";
import Button from "../../Atoms/Button/Button";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import useAppContext from "../../../Hooks/useAppContext";

// Function to confirm if required fields are not blank
function areRequiredFieldsEmpty(): boolean {
  const { name, email, phone, plan } = globalState.getAllStates();
  return !name || !email || !phone || !plan;
}

function FinishingUp() {
  const { goTo } = useCustomNavigate();
  const [total, setTotal] = useState(0);
  const plan = globalState.getState("plan");
  const addOns = globalState.getState("addOns");
  const { updateStage } = useAppContext();

  useEffect(() => {
    let newTotal = 0;

    if (plan) {
      newTotal += plan["cost"];
    }

    if (addOns) {
      newTotal += Object.values(addOns).reduce(
        (sum: number, value) => sum + Number(value),
        0
      );
    }

    setTotal(newTotal);
  }, [plan, addOns]);

  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    goTo("/register/add-ons");
    updateStage(2);
    globalState.setState("stage", 2);
    globalState.storeData();
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (areRequiredFieldsEmpty()) {
      goTo("/register");
      updateStage(0);
      globalState.setState("stage", 0);
      globalState.storeData();
    } else {
      goTo("/register/thank-you");
    }
  };

  return (
    <>
      <Header
        stageHeader="Finishing up"
        explainHeader="Double-check everything looks OK before confirming"
      />
      <div className={styles.selected_plan_container}>
        {plan && (
          <SelectedPlan
            plan={plan["name"]}
            planCost={`$ ${plan["cost"]}/mo`}
            main_plan="main_plan"
          />
        )}

        {addOns &&
          Object.entries(addOns).map(([key, value]) => (
            <SelectedPlan key={key} plan={key} planCost={`${value}/mo`} />
          ))}
      </div>

      <span className={styles.total_container}>
        <p>Total (month)</p>
        <p className={styles.total_cost}>${total}</p>
      </span>

      <span className={styles.buttons}>
        <Button text="go back" onClick={handleGoBack} />
        <Button positionButton="right" text="confirm" onClick={handleConfirm} />
      </span>
    </>
  );
}

export default FinishingUp;
