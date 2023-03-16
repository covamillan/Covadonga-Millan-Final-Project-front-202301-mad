import { SyntheticEvent, useMemo } from "react";
import { useWorkers } from "../../hooks/useWorkers";
import { WorkersRepo } from "../../services/workers/workers.repo";
import { Worker } from "../../models/worker";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";

export default function Register() {
  const repo = useMemo(() => new WorkersRepo(), []);
  const { workerLogin } = useWorkers(repo);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = event.currentTarget as HTMLFormElement;
    const inputs = formData.querySelectorAll("input");

    const newWorker: Partial<Worker> = {
      email: inputs[0].value,
      password: inputs[1].value,
    };

    workerLogin(newWorker);
    formData.reset();
  };
  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <h1>Welcome</h1>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <div>
          <h3>Don't have an account?</h3>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
