import Header from "../../Atoms/Header/Header";
import SelectedPlan from '../../Atoms/SelectedPlan/SelectedPlan';
import styles from './FinishinUp.module.css'
import globalState from "../../../AppState/GlobalState";
import { useState, useEffect } from "react";
import Button from "../../Atoms/Button/Button";
import useCustomNavigate from "../../../Hooks/UseNavigate";

function confirmRequiredFieledAreNotBlank() {
  if (!globalState.getState("name") || !globalState.getState("email") || !globalState.getState("phone") || !globalState.getState("plane")) return true;
}

function FinishingUp() {
  const {goTo} = useCustomNavigate()
  const [total, setTotal] = useState(0);
  const plan = globalState.getState("plan");
  const addOns = globalState.getState("addOns");
  
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
          }}
        />

        <Button
          positionButton="right"
          text="confirm"
          onClick={(e) => {
            e.preventDefault();
            if (confirmRequiredFieledAreNotBlank()) {
              goTo("/register");
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
