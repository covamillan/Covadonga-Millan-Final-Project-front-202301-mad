import styles from "./header.module.scss";
export function Header() {
  return (
    <header className={styles.header}>
      <img src="../../../logo-w.png" alt="logo" />
      <h1>Pet Hospital</h1>
    </header>
  );
}
