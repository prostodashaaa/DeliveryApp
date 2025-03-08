import classNames from "classnames";
import styles from "../../layout/Auth/AuthLayout.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());

    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <form className={classNames(styles.login)} onSubmit={submit}>
      <h1 className={classNames(styles.login__h1)}>Вход</h1>
      {loginErrorMessage && (
        <div className={classNames(styles.error)}>{loginErrorMessage}</div>
      )}
      <div className={classNames(styles.login__input)}>
        <label
          className={classNames(styles.login__input_label)}
          htmlFor="email"
        >
          Ваш email
        </label>
        <Input
          placeholder="Email"
          name="email"
          id="email"
          type="email"
          isValid={!Boolean(loginErrorMessage)}
        />
      </div>
      <div className={classNames(styles.login__input)}>
        <label
          className={classNames(styles.login__input_label)}
          htmlFor="password"
        >
          Ваш пароль
        </label>
        <Input
          placeholder="Пароль"
          name="password"
          id="password"
          type="password"
          isValid={!Boolean(loginErrorMessage)}
        />
      </div>
      <Button className={classNames(styles.login__button)} appearence="big">
        {"Вход"}
      </Button>
      <div className={classNames(styles.login__register)}>
        Нет акканута? <br />
        <Link
          to={"/auth/register"}
          onClick={() => dispatch(userActions.clearLoginError())}
        >
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
}
