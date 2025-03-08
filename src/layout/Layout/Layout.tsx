import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import classNames from "classnames";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.cart.items);
  const profile = useSelector((s: RootState) => s.user.profile);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className={classNames(styles.layout)}>
      <div className={classNames(styles.leftPanel)}>
        <div className={classNames(styles.leftPanel__top)}>
          <div className={classNames(styles.leftPanel__user)}>
            <img src="/User.png" alt="Фото пользователя" />
            <div className={classNames(styles.leftPanel__user_info)}>
              <h1 className={classNames(styles.leftPanel__user_name)}>
                {profile?.name}
              </h1>
              <p className={classNames(styles.leftPanel__user_email)}>
                {profile?.email}
              </p>
            </div>
          </div>
          <div className={classNames(styles.leftPanel__items)}>
            <NavLink
              className={({ isActive }) =>
                classNames(styles.leftPanel__item, {
                  [styles.active]: isActive,
                })
              }
              to="/"
            >
              <img src="/public/Menu.svg" alt="Меню" /> Меню
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                classNames(styles.leftPanel__item, {
                  [styles.active]: isActive,
                })
              }
              to="/cart"
            >
              <img src="/public/Cart.svg" alt="Корзина" /> Корзина
              <div className={classNames(styles["leftPanel__item-count"])}>
                {items.reduce((acc, item) => (acc += item.count), 0)}
              </div>
            </NavLink>
          </div>
        </div>
        <Button
          className={classNames(styles.leftPanel__button)}
          onClick={logout}
        >
          <img src="/public/Logout.svg" alt="Выход" />
          Выйти
        </Button>
      </div>
      <div className={classNames(styles.content)}>
        <Outlet />
      </div>
    </div>
  );
}
