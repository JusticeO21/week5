import styles from './ThankYou.module.css';
import Icon from '../../Atoms/Icon/Icon';
import { useEffect } from 'react';
import useCustomNavigate from '../../../Hooks/UseNavigate';
import { reset as resetStep } from '../../../Redux/sidebarSlice';
import { useAppDispatch } from '../../../Hooks/useRedux';

function ThankYou() {
  const { goTo } = useCustomNavigate();
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTimeout(() => {
      goTo("/")
      dispatch(resetStep())   
    }, 3000)
  }, []);
  return (
    <div className={styles.container}>
        <article className={styles.thank_you}>
        <Icon src='/Images/icon-thank-you.svg' alt='thank_you' position='center' size={70}/>
        <h2>Thank you!</h2>
        <p>
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </article>
    </div>
  );
}

export default ThankYou
