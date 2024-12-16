import styles from "./Home.module.css";
import useCustomNavigate from '../../../Hooks/UseNavigate'

function Home() {
  const { goTo } = useCustomNavigate()
  
  return (
    <section className={styles.container}>
      <div>
        <h1>Welcome to a smooth, seamless signup experience</h1>
        <p>Get ready to join us in just a few easy steps</p>
        <button
          onClick={() => {
            goTo("/register/");
          }}
        >
          start
        </button>
      </div>
    </section>
  );
}

export default Home
