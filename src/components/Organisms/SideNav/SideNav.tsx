import styles from "./SideNav.module.css";
import Stage from "../../Molecules/Stage/Stage";
import useAppContext from "../../../Hooks/useAppContext";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import globalState from "../../../AppState/GlobalState"

interface Stage {
  stage: number;
  label: string;
  stageUrl: string;
}

type SideNavProps = {
  data: Array<Stage>
}

function SideNav({ data }: SideNavProps) {
  const {goTo}  = useCustomNavigate()
  const { stage: currentStage, updateStage: setCurrentSatge } =
    useAppContext();

  function listenToStageClick(stageUr: string, currentStage: number): void {
    if (window.innerWidth < 1000) return;
  goTo(stageUr);
  setCurrentSatge(currentStage);
  globalState.setState("stage", currentStage)
  globalState.storeData();
}

  return (
    <div className={styles.container}>
      <nav>
        {data.map((data,index) => {
          return <Stage stage={data.stage} label={data.label} key={`${data.label}_${index}`} current={Number(currentStage) === index && true} onClick={()=>{listenToStageClick(data.stageUrl, index)}}/>;
        })}
      </nav>
    </div>
  );
}

export default SideNav
