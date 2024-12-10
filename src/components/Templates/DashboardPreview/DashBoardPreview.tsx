import styles from "./DashBoardPreview.module.css"
import SideNav from "../../Organisms/SideNav/SideNav";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import globalState from "../../../AppState/GlobalState";

const data = [
  {
    stage: 1,
    label: "YOUR INFO",
    stageUrl: "",
  },
  {
    stage: 2,
    label: "select plan",
    stageUrl: "select-plan",
  },
  {
    stage: 3,
    label: "add-ons",
    stageUrl: "add-ons",
  },
  {
    stage: 4,
    label: "summary",
    stageUrl: "finishing-up",
  },
];

export type AppStateContextType = {
  stage: string | number;
  updateStage: (stage: number) => void;
};

export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

function DashBoardPreview() {
  const [stage, setStage] = useState(globalState.getState("stage") || 0);

  function updateStage(stage:number) {
    setStage(stage)
  }

  return (
    <AppStateContext.Provider value={{ stage, updateStage }}>
      <div className={styles.container}>
        <SideNav data={data} />

        <section className={styles.formsContainer}>
          <div className={styles.formContent}>
            <Outlet />
          </div>
        </section>
      </div>
    </AppStateContext.Provider>
  );
}

export default DashBoardPreview
