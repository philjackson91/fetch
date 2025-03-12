import { useState } from "react";

import { useAuth } from "./authContext";
import { Button } from "./components";

import cardStyles from "./styles/Card.module.scss";
import inputStyles from "./styles/Input.module.scss";
import loginStyles from "./styles/Login.module.scss";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      login(name, email);
    } else {
      alert("Please enter name and email");
    }
  };

  return (
    <div className={loginStyles.LoginPage}>
      <div className={cardStyles.Card}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={inputStyles.Input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={inputStyles.Input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Button type="submit" text="Login"/>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
