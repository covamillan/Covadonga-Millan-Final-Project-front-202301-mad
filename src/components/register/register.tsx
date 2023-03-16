import { SyntheticEvent, useMemo } from "react";
import { useWorkers } from "../../hooks/useWorkers";
import { Worker } from "../../models/worker";
import { WorkersRepo } from "../../services/workers/workers.repo";
import styles from "./register.module.scss";

export default function Register() {
  const repo = useMemo(() => new WorkersRepo(), []);
  const { workerRegister } = useWorkers(repo);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = event.currentTarget as HTMLFormElement;
    const inputs = formData.querySelectorAll("input");

    const newUser: Partial<Worker> = {
      email: inputs[0].value,
      password: inputs[1].value,
    };

    workerRegister(newUser);
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
        <button type="submit">Sign Up</button>
        <div>
          <h3>Already have an account?</h3>
          <h3>Login</h3>
        </div>
      </form>
    </div>
  );
}
