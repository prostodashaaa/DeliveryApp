import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import classNames from "classnames";

export function AuthLayout() {
  return (
    <div className={classNames(styles.layout)}>
      <div className={classNames(styles.logo)}>
        <img src="/DeliveryApp/Logo.svg" alt="Логотип" />
      </div>
      <div className={classNames(styles.content)}>
        <Outlet />
      </div>
    </div>
  );
}
