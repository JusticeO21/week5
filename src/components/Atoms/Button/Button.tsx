import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    text: string;
    positionButton?:string
};

function Button({onClick, text, positionButton}:ButtonProps) {
  return (
      <button onClick={onClick} className={`${styles.button} ${styles[`${positionButton}`]}`}>
          {text}
     </button>
  )
}

export default Button
