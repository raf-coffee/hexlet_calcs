import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles["lds-spinner"]}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
