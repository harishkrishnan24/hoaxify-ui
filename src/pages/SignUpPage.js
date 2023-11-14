import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../components/Input";

const SignUpPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeUsername = (event) => {
    setErrors({ ...errors, username: "" });
    setUsername(event.target.value);
  };

  const onChangeEmail = (event) => {
    setErrors({ ...errors, email: "" });
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setErrors({ ...errors, password: "" });
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
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.validationErrors);
      }
      setApiProgress(false);
    }
  };

  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      {!signUpSuccess && (
        <form className="card mt-5" data-testid="form-sign-up">
          <div className="card-header">
            <h1 className="text-center">{t("signUp")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label={t("username")}
              onChange={onChangeUsername}
              help={errors.username}
            />
            <Input
              id="email"
              label={t("email")}
              onChange={onChangeEmail}
              help={errors.email}
            />
            <Input
              id="password"
              label={t("password")}
              type="password"
              onChange={onChangePassword}
              help={errors.password}
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              type="password"
              onChange={onChangePasswordRepeat}
              help={password !== passwordRepeat ? "Password mismatch" : ""}
            />
            <div className="text-center">
              <button
                className="btn btn-primary"
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
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                )}
                {t("signUp")}
              </button>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <div className="alert alert-success mt-3">
          Please check your e-mail to activate your account
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
