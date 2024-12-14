import styles from "./DashBoardPreview.module.css";
import SideNav from "../../Organisms/SideNav/SideNav";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import globalState from "../../../AppState/GlobalState";

const data = [
  { stage: 1, label: "YOUR INFO", stageUrl: "" },
  { stage: 2, label: "Select Plan", stageUrl: "select-plan" },
  { stage: 3, label: "Add-ons", stageUrl: "add-ons" },
  { stage: 4, label: "Summary", stageUrl: "finishing-up" },
];


export type AppStateContextType = {
  stage: string | number;
  updateStage: (stage: number) => void;
};


export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

function DashBoardPreview() {
  const initialStage = globalState.getState("stage") || 0;
  const [stage, setStage] = useState<number | string>(initialStage);

  function updateStage(stage: number): void {
    setStage(stage);
    globalState.setState("stage", stage);
    globalState.storeData(); 
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

export default DashBoardPreview;
