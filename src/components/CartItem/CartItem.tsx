import { useDispatch, useSelector } from "react-redux";
import { CartItemProps } from "./CartItem.props";
import { AppDispatch, RootState } from "../../store/store";
import classNames from "classnames";
import styles from "./CartItem.module.css";
import { cartActions } from "../../store/cart.slice";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const userActive = useSelector((s: RootState) => s.user.profile);
  const profile = userActive ? userActive.email : "";

  const increase = () => {
    dispatch(cartActions.add({ id: props.id, email: profile }));
  };

  const descrease = () => {
    dispatch(cartActions.remove({ id: props.id, email: profile }));
    if (props.count == 1) {
      dispatch(cartActions.delete({ id: props.id, email: profile }));
    }
  };

  const remove = () => {
    dispatch(cartActions.delete({ id: props.id, email: profile }));
  };

  return (
    <div className={classNames(styles["cart-item"])}>
      <div className={classNames(styles["cart-item__section"])}>
        <img
          className={classNames(styles["cart-item__image"])}
          src={props.image}
          alt="Картинка товара"
        />
        <div className={classNames(styles["cart-item__description"])}>
          <div className={classNames(styles["cart-item__name"])}>
            {props.name}
          </div>
          <div className={classNames(styles["cart-item__price"])}>
            {props.price}
            <span className={classNames(styles.ruble)}>&#8381;</span>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          styles["cart-item__section"],
          styles["cart-item__section_button"]
        )}
      >
        <div className={classNames(styles["cart-item__actions"])}>
          <button
            className={classNames(styles.action__button, styles.minus)}
            onClick={descrease}
          >
            <img src="/DeliveryApp/Minus.svg" alt="Удалить из корзины" />
          </button>
          <div className={classNames(styles["cart-item__count"])}>
            {props.count}
          </div>
          <button
            className={classNames(styles.action__button, styles.plus)}
            onClick={increase}
          >
            <img src="/DeliveryApp/Plus.svg" alt="Добавить в корзину" />
          </button>
        </div>
        <button
          className={classNames(styles.action__button, styles.delete)}
          onClick={remove}
        >
          <img src="/DeliveryApp/Remove.svg" alt="Удалить товар" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
