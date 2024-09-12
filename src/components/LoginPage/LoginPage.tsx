import React, { useState } from "react";
import "./LoginPage.scss";
import cn from "classnames";
import { useAppDispatch } from "../../custom-hooks/reduxHooks.ts";
import { Navigate } from "react-router-dom";
import { setLoginAuth } from "../../redux/slices/auth.slice.ts";

export const LoginPage: React.FC = () => {
  console.log(process.env);

  const dispatch = useAppDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [redirectToAdmin, setRedirectToAdmin] = useState(false);

  const reset = () => {
    setLogin("");
    setPassword("");
  };

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmitForm = (login, password) => {
    if (!login || !password) {
      if (!login) {
        setLoginError("Please enter the login");
      }
      if (!password) {
        setPasswordError("Please enter the login");
      }
      return;
    }

    if (
      login === process.env.REACT_APP_LOGIN &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      dispatch(setLoginAuth(true));
      setRedirectToAdmin(true);
    } else {
      setLoginError("uncorecct passord or login");
    }

    reset();

    return;
  };

  if (redirectToAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="LoginPage__center">
      <div className="LoginPage">
        <form>
          <label className="ContactsForm__form__label" htmlFor="login">
            Login
            {loginError && (
              <p className="ContactsForm__form__label__error">{loginError}</p>
            )}
            <input
              onChange={(event) => setLogin(event.target.value)}
              value={login}
              className={cn("ContactsForm__form__input", {
                "ContactsForm__form__input--error": loginError,
              })}
              minLength={4}
              maxLength={40}
              type="text"
              id="login"
              placeholder="enter the admin login"
              required
            />
          </label>

          <label className="ContactsForm__form__label" htmlFor="password">
            password
            {passwordError && (
              <p className="ContactsForm__form__label__error">
                {passwordError}
              </p>
            )}
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              className={cn("ContactsForm__form__input", {
                "ContactsForm__form__input--error": passwordError,
              })}
              minLength={4}
              maxLength={40}
              type="password"
              id="password"
              placeholder="enter password of admin"
              required
            />
          </label>

          <button
            onClick={() => handleSubmitForm(login, password)}
            className="ContactsForm__form__button"
          >
            log in
          </button>
        </form>
      </div>
    </div>
  );
};
