import styles from "./DashBoardPreview.module.css"
import SideNav from "../../Organisms/SideNav/SideNav";
import { Outlet } from "react-router-dom";

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

type DashBoardPreviewprops = {
    
}

function DashBoardPreview({ }: DashBoardPreviewprops) {
  return (
    <div className={styles.container}>
      <SideNav data={data} />
      <section className={styles.formsContainer}><Outlet/></section>
    </div>
  );
}

export default DashBoardPreview
