import styles from "./Card.module.css";
import Icon from "../../Atoms/Icon/Icon";

type CardProps = {
  iconSrc: string;
  planName: string;
  isAYearPlan?: boolean;
  plan: string;
  selected?: string;
  onClick: () => void;
};

function Card({
  iconSrc,
  planName,
  isAYearPlan = false,
  plan,
  selected = "",
  onClick,
}: CardProps): JSX.Element {
  const cardClasses = `${styles.card_container} ${
    selected ? styles[selected] : ""
  }`;

  return (
    <div className={cardClasses} onClick={onClick}>
      <span className={styles.card_content}>
        <Icon src={iconSrc} alt={`pl_${planName}`} />
        <span className={styles.description}>
          <article>
            <h4>{planName}</h4>
            <p>{plan}</p>
            {isAYearPlan && <p className={styles.isAYearPlan}>2 months free</p>}
          </article>
        </span>
      </span>
    </div>
  );
}

export default Card;
