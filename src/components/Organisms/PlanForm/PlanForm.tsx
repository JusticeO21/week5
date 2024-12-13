import styles from './PlanForm.module.css';
import Header from '../../Atoms/Header/Header';
import Card from '../../Molecules/Card/Card';
import Button from '../../Atoms/Button/Button';
import useCustomNavigate from '../../../Hooks/UseNavigate';
import ThemeSwitch from '../../Molecules/ThemeSwitch/ThemeSwitch';
import { useAppDispatch, useAppSelector } from "../../../Hooks/useRedux";
import { goToNextStep, goBack } from "../../../Redux/sidebarSlice";
import { updatePlan, updatePlanDuration, reset as resetPlan } from '../../../Redux/PlanAndAddOnSlice';
import Reset from '../../Atoms/Reset/Reset';

function PlanForm() {
  const { goToSelectedStep } = useCustomNavigate();
  const selectedPlan = (useAppSelector(state=>state.planAndAddOns.plan?.["name"]) || "");
  const {isAYearPlan} = useAppSelector(state => state.planAndAddOns)
  const dispatch = useAppDispatch();

  function handleCardClick(plan: string, cost:number) {
    const storedplan = {
      name: `${plan}`,
      cost: cost
    }
    dispatch(updatePlan(storedplan))
  }

  function handleReset() {
        dispatch(resetPlan());
  }

  function handleToggleTheme() {
    dispatch(updatePlanDuration())
    dispatch(resetPlan());
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
      
      <Reset onClick={handleReset}/>
      <Header
        stageHeader="Select your plan"
        explainHeader="You have the option of monthly or yearly billing."
      />
      <div className={styles.container}>
        <Card
          iconSrc="/Images/icon-arcade.svg"
          planName="Arcade"
          plan={`$${isAYearPlan ? 150 : 15}/${isAYearPlan ? "yr" : "mo"}`}
          selected={selectedPlan === "Arcade" ? "selected" : ""}
          isAYearPlan={isAYearPlan ? true : false}
          onClick={() => handleCardClick("Arcade", isAYearPlan ? 150 : 15)}
        />

        <Card
          iconSrc="/Images/icon-advanced.svg"
          planName="Advanced"
          plan={`$${isAYearPlan ? 120 : 12}/${isAYearPlan ? "yr" : "mo"}`}
          selected={selectedPlan === "Advanced" ? "selected" : ""}
          isAYearPlan={isAYearPlan ? true : false}
          onClick={() => handleCardClick("Advanced", isAYearPlan ? 120 : 12)}
        />

        <Card
          iconSrc="/Images/icon-pro.svg"
          planName="Pro"
          plan={`$${isAYearPlan ? 90 : 9}/${isAYearPlan ? "yr" : "mo"}`}
          selected={selectedPlan === "Pro" ? "selected" : ""}
          isAYearPlan={isAYearPlan ? true : false}
          onClick={() => handleCardClick("Pro", isAYearPlan ? 90 : 9)}
        />
      </div>
      <ThemeSwitch theme={isAYearPlan} toggleSwitch={handleToggleTheme} />
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
