import styles from "./SelectedPlan.module.css";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import globalState from "../../../AppState/GlobalState";

type SelectedPlanProps = {
  planCost: string;
  plan: string;
  main_plan?: string;
}

function SelectedPlan({ planCost, plan, main_plan }: SelectedPlanProps) {
  const { goTo } = useCustomNavigate();
  return (
    <article className={`${styles.container} ${styles[`${main_plan}`]}`}>
      <span className={styles.plan}>
        <h5>{plan}</h5>
        <button onClick={() => {
          goTo("/register/select-plan");
          globalState.setState("stage", 1)
        }}>change</button>
      </span>
      <p className={styles.plan_cost}>{planCost}</p>
    </article>
  );
}

export default SelectedPlan
