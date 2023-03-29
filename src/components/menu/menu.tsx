import { Link } from "react-router-dom";
import styles from "./menu.module.scss";

export function Menu() {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/add-pet">Add pet</Link>
        </li>
        <li>
          <a href="https://covadonga-millan-final-project.netlify.app/logout">
            Log out <img src="../../../logout.png" alt="logout" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
