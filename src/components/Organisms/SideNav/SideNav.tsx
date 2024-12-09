import styles from "./SideNav.module.css";
import Stage from "../../Molecules/Stage/Stage";
import { useState } from "react";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import globalState from "../../../AppState/GlobalState";

interface Stage {
  stage: number;
  label: string;
  stageUrl: string;
}

type SideNaveProps = {
  data: Array<Stage>
}

function SideNav({ data }: SideNaveProps) {
  const {goTo}  = useCustomNavigate()
  const [currentStage, setCurrentSatge] = useState<number>(globalState.getState("stage") || 0);

function listenToStageClick(stageUr: string, currentStage:number): void {
  goTo(stageUr);
  setCurrentSatge(currentStage);
  globalState.setState("stage", currentStage)
  globalState.storeData();
}

  return (
    <div className={styles.container}>
      <nav>
        {data.map((data,index) => {
          return <Stage stage={data.stage} label={data.label} key={`${data.label}_${index}`} current={currentStage === index && true} onClick={()=>{listenToStageClick(data.stageUrl, index)}}/>;
        })}
      </nav>
    </div>
  );
}

export default SideNav
