import axios from "axios";
import { useState } from "react";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

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

  const submit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    try {
      await axios.post("/api/1.0/users", { username, email, password });
      setSignUpSuccess(true);
    } catch (err) {}
  };

  return (
    <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2'>
      {!signUpSuccess && (
        <form
          className='card mt-5'
          data-testid='form-sign-up'
        >
          <div className='card-header'>
            <h1 className='text-center'>Sign Up</h1>
          </div>
          <div className='card-body'>
            <div className='mb-3'>
              <label
                htmlFor='username'
                className='form-label'
              >
                Username
              </label>
              <input
                id='username'
                className='form-control'
                onChange={onChangeUsername}
              />
            </div>
            <div className='mb-3'>
              <label
                htmlFor='email'
                className='form-label'
              >
                E-mail
              </label>
              <input
                id='email'
                className='form-control'
                onChange={onChangeEmail}
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='password'
                className='form-label'
              >
                Password
              </label>
              <input
                id='password'
                className='form-control'
                type='password'
                onChange={onChangePassword}
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='passwordRepeat'
                className='form-label'
              >
                Password Repeat
              </label>
              <input
                id='passwordRepeat'
                className='form-control'
                type='password'
                onChange={onChangePasswordRepeat}
              />
            </div>
            <div className='text-center'>
              <button
                className='btn btn-primary'
                disabled={
                  password !== passwordRepeat ||
                  !password ||
                  !passwordRepeat ||
                  apiProgress
                }
                onClick={submit}
              >
                {apiProgress && (
                  <span
                    className='spinner-border spinner-border-sm'
                    role='status'
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <div className='alert alert-success mt-3'>
          Please check your e-mail to activate your account
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
