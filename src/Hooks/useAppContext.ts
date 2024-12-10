import { useContext } from "react";
import { AppStateContext } from "../components/Templates/DashboardPreview/DashBoardPreview";
import { AppStateContextType } from "../components/Templates/DashboardPreview/DashBoardPreview";

export  const useAppContext = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export default useAppContext
