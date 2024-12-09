import { useNavigate } from 'react-router-dom';


const useCustomNavigate = () => {
    const navigate = useNavigate(); 
    
  const goTo = (path: string) => {
    navigate(path);  
  };

  return {
    goTo
  };
};

export default useCustomNavigate;
