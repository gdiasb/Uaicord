import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.animation}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </div>
  );
}
