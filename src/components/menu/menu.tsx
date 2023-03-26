import { Link } from "react-router-dom";
import styles from "./menu.module.scss";
import { MenuOption } from "../app/app";

type MenuProps = {
  options: MenuOption[];
};

export function Menu({ options }: MenuProps) {
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
          <Link to="/logout">
            Log out <img src="../../../logout.png" alt="logout" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
