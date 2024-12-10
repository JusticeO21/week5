import Header from "../../Atoms/Header/Header";
import SelectedPlan from '../../Atoms/SelectedPlan/SelectedPlan';
import styles from './FinishinUp.module.css'
import globalState from "../../../AppState/GlobalState";
import { useState, useEffect } from "react";
import Button from "../../Atoms/Button/Button";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import useAppContext from "../../../Hooks/useAppContext";

function confirmRequiredFieledAreNotBlank() {
  if (!globalState.getState("name") || !globalState.getState("email") || !globalState.getState("phone") || !globalState.getState("plan")) return true;
  return false
}

function FinishingUp() {
  const {goTo} = useCustomNavigate()
  const [total, setTotal] = useState(0);
  const plan = globalState.getState("plan");
  const addOns = globalState.getState("addOns");
  const { updateStage} = useAppContext();
  
    useEffect(() => {
      let newTotal = 0;

      if (plan) {
        newTotal += plan["cost"];
      }

      if (addOns) {
        Object.values(addOns).forEach((value) => {
          newTotal += Number(value);
        });
      }

      setTotal(newTotal);
    }, [plan, addOns]);

  return (
    <>

        <Header
          stageHeader="Finishing up"
          explainHeader="Double-check everything looks OK before confirming"
        />
        <div className={styles.selected_plan_container}>
          {plan && (
            <SelectedPlan
              plan={`${plan["name"]}`}
              planCost={`$ ${plan["cost"]}/mo`}
              main_plan="main_plan"
            />
          )}

          {addOns &&
            Object.entries(addOns).map(([key, value]) => {
              return (
                <SelectedPlan
                  plan={`${key}`}
                  planCost={`${value}/mo`}
                  key={key}
                />
              );
            })}
        </div>

        <span className={styles.total_container}>
          <p>Total (month)</p>
          <p className={styles.total_cost}>${total}</p>
        </span>

        <span className={styles.buttons}>
          <Button
            text="go back"
            onClick={(e) => {
              e.preventDefault();
              goTo("/register/add-ons");
              updateStage(2);
              globalState.setState("stage", 2);
              globalState.storeData();
            }}
          />

          <Button
            positionButton="right"
            text="confirm"
            onClick={(e) => {
              e.preventDefault();
              if (confirmRequiredFieledAreNotBlank()) {
                goTo("/register");
                updateStage(0);
                globalState.setState("stage", 0);
                globalState.storeData();
              } else {
                goTo("/register/thank-you");
              }
            }}
          />
        </span>
    </>
  );
}

export default FinishingUp;
