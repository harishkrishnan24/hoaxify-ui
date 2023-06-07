import axios from "axios";
import { useState } from "react";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangePasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    axios.post("/api/1.0/users", { username, email, password });
  };

  return (
    <div>
      <form>
        <h1>Sign Up</h1>

        <label htmlFor='username'>Username</label>
        <input
          id='username'
          onChange={onChangeUsername}
        />

        <label htmlFor='email'>E-mail</label>
        <input
          id='email'
          onChange={onChangeEmail}
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          onChange={onChangePassword}
        />

        <label htmlFor='passwordRepeat'>Password Repeat</label>
        <input
          id='passwordRepeat'
          type='password'
          onChange={onChangePasswordRepeat}
        />

        <button
          disabled={password !== passwordRepeat || !password || !passwordRepeat}
          onClick={submit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
