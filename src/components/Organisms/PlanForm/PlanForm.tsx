import styles from './PlanForm.module.css';
import Header from '../../Atoms/Header/Header';
import Card from '../../Molecules/Card/Card';
import Button from '../../Atoms/Button/Button';
import { useState } from 'react';
import globalState from '../../../AppState/GlobalState';
import useCustomNavigate from '../../../Hooks/UseNavigate';
import ThemeSwitch from '../../Molecules/ThemeSwitch/ThemeSwitch';
import { useAppDispatch } from "../../../Hooks/useRedux";
import { goToNextStep, goBack } from "../../../Redux/sidebarSlice";

function PlanForm() {
  const { goToSelectedStep } = useCustomNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>(globalState.getState("plan")?.["name"] || "");
  const [duration, setDuration] = useState<string>(globalState.getState("duration") || "");
  const dispatch = useAppDispatch();

  function handleCardClick(plan: string, cost:number) {
    const storedplan = {
      name: `${plan}`,
      cost: cost
    }

    globalState.setState("plan", storedplan)
    globalState.storeData();
    setSelectedPlan(plan);
  }

  function handleToggleTheme () {
    setDuration((prev) => (!prev ? "yearly" : ""));
    globalState.setState("duration", !duration ? "yearly" : "");
    globalState.setState("plan", "");
    setSelectedPlan("");
    globalState.setState("addOns","")
    globalState.storeData();

  };

  function handleNextButtonClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      dispatch(goToNextStep());
      goToSelectedStep();
  }

    function handleBackButtonClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      dispatch(goBack());
      goToSelectedStep();
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
        <Button
          text="go back"
          onClick={(e) => handleBackButtonClick(e)}
        />

        <Button
          positionButton="right"
          text="next step"
          onClick={(e) => handleNextButtonClick(e)}
        />
      </span>
    </>
  );
}

export default PlanForm
