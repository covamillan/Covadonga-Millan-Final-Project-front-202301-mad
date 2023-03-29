import { SyntheticEvent, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWorkers } from "../../hooks/useWorkers";
import { Worker } from "../../models/worker";
import { WorkersRepo } from "../../services/workers/workers.repo";
import styles from "./register.module.scss";

export default function Register() {
  const repo = useMemo(() => new WorkersRepo(), []);
  const { workerRegister } = useWorkers(repo);
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = event.currentTarget as HTMLFormElement;
    const inputs = formData.querySelectorAll("input");

    const newWorker: Partial<Worker> = {
      email: inputs[0].value,
      password: inputs[1].value,
    };

    workerRegister(newWorker);
    formData.reset();
  };
  return (
    <div className={styles.register}>
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
        <button type="submit" onClick={() => navigate(`/login`)}>
          Register
        </button>
        <div>
          <h3>Already have an account?</h3>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
