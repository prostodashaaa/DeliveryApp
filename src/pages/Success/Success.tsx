import classNames from "classnames";
import styles from "./Success.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export function Success() {
  const navigate = useNavigate();


  return (
    <>
      <div className={classNames(styles.success__section)}>
        <div className={classNames(styles.success__image)}>
          <img src="/DeliveryApp/SuccessOrder.svg" alt="Заказ оформелен" />
        </div>
        <div className={classNames(styles.success__text)}>
          Ваш заказ успешно оформлен!
        </div>
        <Button appearence="big" onClick={() => navigate('/')}>{"Сделать новый"}</Button>
      </div>
    </>
  );
}
