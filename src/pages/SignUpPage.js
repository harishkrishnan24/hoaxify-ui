import axios from "axios";
import { useState } from "react";

const SignUpPage = () => {
  const [disabled, setDisabled] = useState(true);
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
    const currentPassword = event.target.value;
    setPassword(currentPassword);
    if (password && passwordRepeat) {
      setDisabled(currentPassword !== passwordRepeat);
    }
  };

  const onChangePasswordRepeat = (event) => {
    const currentPasswordRepeat = event.target.value;
    setPasswordRepeat(currentPasswordRepeat);
    if (password && passwordRepeat) {
      setDisabled(currentPasswordRepeat !== password);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/1.0/users", { username, email, password });
  };

  return (
    <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
      <form className="card mt-5">
        <div className="card-header">
          <h1 className="text-center">Sign Up</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              className="form-control"
              onChange={onChangeUsername}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              E-mail
            </label>
            <input
              className="form-control"
              id="email"
              onChange={onChangeEmail}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              onChange={onChangePassword}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="passwordRepeat">
              Password Repeat
            </label>
            <input
              className="form-control"
              id="passwordRepeat"
              type="password"
              onChange={onChangePasswordRepeat}
            />
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={disabled}
              onClick={onSubmit}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
