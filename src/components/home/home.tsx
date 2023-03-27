import { Cards } from "../cards/cards";
import styles from "./home.module.scss";
export default function Home() {
  return (
    <div className={styles.home}>
      <Cards />
    </div>
  );
}
