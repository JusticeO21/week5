// import StageNumber from './components/Atoms/StageNumber/StageNumber';
// import StageLabel from './components/Atoms/StageLabel/StageLabel';
// import Stage from './components/Molecules/Stage/Stage';
// import Header from './components/Atoms/Header/Header';
import Form from './components/Organisms/PersonalInfoForm/PersonalInfoForm';
import DashBoardPreview from './components/Templates/DashboardPreview/DashBoardPreview';
import styles from "./App.module.css";
import PlanForm from './components/Organisms/PlanForm/PlanForm';
import AddOnsForm from './components/Organisms/AddOnsForm/AddOnsForm';
import FinishingUp from './components/Organisms/FinishingUp/FinishingUp';
import ThankYou from './components/Organisms/ThankYou/ThankYou';
import PersonalInfoForm from './components/Organisms/PersonalInfoForm/PersonalInfoForm';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Templates/Home/Home';

function App() {
  return (
    <Router>
      <main className={styles.App}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<DashBoardPreview />}>
            <Route index element={<PersonalInfoForm />} />
            <Route path="select-plan" element={<PlanForm />} />
            <Route path="add-ons" element={<AddOnsForm />} />
            <Route path="finishing-up" element={<FinishingUp />} />
            <Route path="thank-you" element={<ThankYou />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
