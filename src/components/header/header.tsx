import styles from "./header.module.scss";
type HeaderProps = { children: JSX.Element };
export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <img src="../../../logo-w.png" alt="logo" />
        <h1>Pet Hospital</h1>
      </div>
      <div>{children}</div>
    </header>
  );
}
