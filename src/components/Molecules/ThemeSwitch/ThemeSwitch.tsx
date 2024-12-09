import { useState} from 'react';
import styles from "./ThemeSwitch.module.css"
import globalState from '../../../AppState/GlobalState';


type ThemeSwitch = {
  theme: string;
  toggleSwitch: () => void;
}
function ThemeSwitch({theme, toggleSwitch} :ThemeSwitch) {

    

  return (
    <div className={styles.swithcContainer}>
      <p style={{ color: !theme ? "#022959" : "#9699AA" }}>monthly</p>
      <label className={styles.switch}>
        <input
          type="checkbox"
          className={styles.toggle}
          onChange={toggleSwitch}
          checked={theme ? true : false}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <p style={{ color: theme ? "#022959" : "#9699AA" }}>yearly</p>
    </div>
  );
}

export default ThemeSwitch
