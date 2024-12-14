import styles from "./Home.module.css";
import useCustomNavigate from "../../../Hooks/UseNavigate";

function Home() {
  const { goTo } = useCustomNavigate();

  function handleStartClick(): void {
    goTo("/register/");
  }

  return (
    <section className={styles.container}>
      <div>
        <h1>Welcome to a smooth, seamless signup experience</h1>
        <p>Get ready to join us in just a few easy steps</p>
        <button onClick={handleStartClick}>Start</button>
      </div>
    </section>
  );
}

export default Home;
