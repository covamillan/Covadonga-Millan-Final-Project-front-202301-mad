export function Login() {
  return (
    <form className="login-form">
      <input
        type="text"
        placeholder="Email"
        className="login-form__field"
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        className="login-form__field"
        name="password"
      />

      <button type="submit">Login</button>
    </form>
  );
}
