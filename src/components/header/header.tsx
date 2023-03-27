import { Menu } from "../menu/menu";
import styles from "./header.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function Header() {
  const workersState = useSelector((state: RootState) => state.workers);

  return (
    <header className={styles.header}>
      <div>
        <img src="../../../logo-w.png" alt="logo" />
        <h1>Pet Hospital</h1>
      </div>
      {workersState.workerLogged && (
        <div className="menu">
          <Menu />
        </div>
      )}
    </header>
  );
}
