import StageNumber from '../../Atoms/StageNumber/StageNumber';
import styles from './Stage.module.css';
import StageLabel from '../../Atoms/StageLabel/StageLabel';

type StageProps = {
  stage: number;
  label: string;
  current: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function Stage({stage, label, current, onClick}:StageProps) {
  return (
      <div className={styles.container}>
      <StageNumber stage={stage} onClick={onClick} current={current} />
          <StageLabel stage={stage} label={label} />     
    </div>
  )
}

export default Stage
