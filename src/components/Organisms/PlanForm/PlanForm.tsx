import styles from "./PlanForm.module.css";
import Header from "../../Atoms/Header/Header";
import Card from "../../Molecules/Card/Card";
import Button from "../../Atoms/Button/Button";
import { useState } from "react";
import globalState from "../../../AppState/GlobalState";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import ThemeSwitch from "../../Molecules/ThemeSwitch/ThemeSwitch";
import useAppContext from "../../../Hooks/useAppContext";

function PlanForm() {
  const { goTo } = useCustomNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>(
    globalState.getState("plan")?.["name"] || ""
  );
  const [duration, setDuration] = useState<string>(
    globalState.getState("duration") || ""
  );
  const { updateStage } = useAppContext();

  function handleCardClick(plan: string, cost: number): void {
    const storedPlan = {
      name: plan,
      cost: cost,
    };

    globalState.setState("plan", storedPlan);
    globalState.storeData();
    setSelectedPlan(plan);
  }

  function handleToggleTheme(): void {
    const newDuration = duration === "" ? "yearly" : "";
    setDuration(newDuration);
    globalState.setState("duration", newDuration);
    globalState.setState("plan", "");
    setSelectedPlan("");
    globalState.setState("addOns", "");
    globalState.storeData();
  }

  function handleGoBack(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    goTo("/register");
    updateStage(0);
    globalState.setState("stage", 0);
    globalState.storeData();
  }

  function handleNextStep(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    goTo("/register/add-ons");
    updateStage(2);
    globalState.setState("stage", 2);
    globalState.storeData();
  }

  return (
    <>
      <Header
        stageHeader="Select your plan"
        explainHeader="You have the option of monthly or yearly billing."
      />
      <div className={styles.container}>
        <Card
          iconSrc="/Images/icon-arcade.svg"
          planName="Arcade"
          plan={`$${duration ? 150 : 15}/${duration ? "yr" : "mo"}`}
          selected={selectedPlan === "Arcade" ? "selected" : ""}
          isAYearPlan={duration ? true : false}
          onClick={() => handleCardClick("Arcade", duration ? 150 : 15)}
        />

        <Card
          iconSrc="/Images/icon-advanced.svg"
          planName="Advanced"
          plan={`$${duration ? 120 : 12}/${duration ? "yr" : "mo"}`}
          selected={selectedPlan === "Advanced" ? "selected" : ""}
          isAYearPlan={duration ? true : false}
          onClick={() => handleCardClick("Advanced", duration ? 120 : 12)}
        />

        <Card
          iconSrc="/Images/icon-pro.svg"
          planName="Pro"
          plan={`$${duration ? 90 : 9}/${duration ? "yr" : "mo"}`}
          selected={selectedPlan === "Pro" ? "selected" : ""}
          isAYearPlan={duration ? true : false}
          onClick={() => handleCardClick("Pro", duration ? 90 : 9)}
        />
      </div>
      <ThemeSwitch theme={duration} toggleSwitch={handleToggleTheme} />
      <span className={styles.buttons}>
        <Button text="go back" onClick={handleGoBack} />

        <Button
          positionButton="right"
          text="next step"
          onClick={handleNextStep}
        />
      </span>
    </>
  );
}

export default PlanForm;
