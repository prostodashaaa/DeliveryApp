import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classNames from "classnames";
import styles from "../../layout/Auth/AuthLayout.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userActions, register } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());

    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    await sendLogin(email.value, password.value, name.value);
  };

  const sendLogin = async (email: string, password: string, name: string) => {
    dispatch(register({ email, password, name }));
  };

  return (
    <form className={classNames(styles.login)} onSubmit={submit}>
      <h1 className={classNames(styles.login__h1)}>Регистрация</h1>
      {registerErrorMessage && (
        <div className={classNames(styles.error)}>{registerErrorMessage}</div>
      )}
      <div className={classNames(styles.login__input)}>
        <label
          className={classNames(styles.login__input_label)}
          htmlFor="email"
        >
          Ваш email
        </label>
        <Input placeholder="Email" name="email" id="email" type="email" />
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
        />
      </div>
      <div className={classNames(styles.login__input)}>
        <label className={classNames(styles.login__input_label)} htmlFor="name">
          Ваше имя
        </label>
        <Input placeholder="Имя" name="name" id="name" type="name" />
      </div>
      <Button className={classNames(styles.register__button)} appearence="big">
        {"Зарегистрироваться"}
      </Button>
      <div className={classNames(styles.login__register)}>
        Есть аккаунт? <br />
        <Link
          to={"/auth/login"}
          onClick={() => dispatch(userActions.clearRegisterError())}
        >
          Войти
        </Link>
      </div>
    </form>
  );
}
