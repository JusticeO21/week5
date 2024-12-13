import { useNavigate } from 'react-router-dom';
import data from '../appData/stageData';
import { useAppSelector } from './useRedux';

const useCustomNavigate = () => {
  const navigate = useNavigate();
  const {step} = useAppSelector(state => state.sidebar)
    
  const goTo = (path: string) => {
    navigate(path);  
  };

  const goToSelectedStep = () => {
    navigate(`/register/${data[step-1]["stageUrl"]}`)
  }

  return {
    goTo,
    goToSelectedStep
  };
};

export default useCustomNavigate;
