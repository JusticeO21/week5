import styles from "./SideNav.module.css";
import Stage from "../../Molecules/Stage/Stage";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import { useAppSelector, useAppDispatch } from "../../../Hooks/useRedux";
import { updateStep } from "../../../Redux/sidebarSlice";

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
  const step = useAppSelector((state) => state.sidebar.step);
  const dispatch = useAppDispatch();

  function listenToStageClick(stageUrl: string, currentStage: number): void {
    if (window.innerWidth < 1000) return;
    goTo(stageUrl);
    dispatch(updateStep({ step: currentStage }));
}

  return (
    <div className={styles.container}>
      <nav>
        {data.map((data,index) => {
          return <Stage stage={data.stage} label={data.label} key={`${data.label}_${index}`} current={step === (index + 1) && true} onClick={()=>{listenToStageClick(data.stageUrl, index + 1)}}/>;
        })}
      </nav>
    </div>
  );
}

export default SideNav
