import styles from './StageNumber.module.css'

type StageNumberProps = {
    stage: number;
    current: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function StageNumber({stage, onClick, current}:StageNumberProps) {
  return (
      <div className={`${styles.container} ${current && styles.active}`} onClick={onClick}>
          <p>{ stage }</p>
      </div>
  )
}

export default StageNumber
