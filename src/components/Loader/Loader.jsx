import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles["lds-heart"]}>
      <div />
    </div>
  );
}
