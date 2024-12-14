import styles from "./ThemeSwitch.module.css";

type ThemeSwitchProps = {
  theme: string;
  toggleSwitch: () => void;
};

function ThemeSwitch({ theme, toggleSwitch }: ThemeSwitchProps): JSX.Element {
  const isMonthly = !theme;
  const isYearly = !!theme;

  return (
    <div className={styles.switchContainer}>
      <p style={{ color: isMonthly ? "#022959" : "#9699AA" }}>monthly</p>
      <label className={styles.switch}>
        <input
          type="checkbox"
          className={styles.toggle}
          onChange={toggleSwitch}
          checked={isYearly}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <p style={{ color: isYearly ? "#022959" : "#9699AA" }}>yearly</p>
    </div>
  );
}

export default ThemeSwitch;
