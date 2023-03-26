import { Menu } from "../menu/menu";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src="../../../logo-w.png" alt="logo" />
        <h1>Pet Hospital</h1>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </header>
  );
}
