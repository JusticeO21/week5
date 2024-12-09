import styles from './Icon.module.css'

type IconProps = {
  src: string;
  alt: string;
  size?: number;
  position?: string;
};
    
function Icon({src, alt, size, position}:IconProps) {
  return (
    <span className={`${styles.image_container} ${styles[`${position}`]}`} style={{height:`${size}px`, width:`${size}px`}}>
      <img
        src={src}
        alt={alt}
      />
    </span>
  );
}

export default Icon
