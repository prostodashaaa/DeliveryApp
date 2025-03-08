import { useDispatch } from "react-redux";
import { CartItemProps } from "./CartItem.props";
import { AppDispatch } from "../../store/store";
import classNames from "classnames";
import styles from "./CartItem.module.css";
import { cartActions } from "../../store/cart.slice";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const descrease = () => {
    dispatch(cartActions.remove(props.id));
    if (props.count == 1) {
      dispatch(cartActions.delete(props.id));
    }
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
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
            <img src="/public/Minus.svg" alt="Удалить из корзины" />
          </button>
          <div className={classNames(styles["cart-item__count"])}>
            {props.count}
          </div>
          <button
            className={classNames(styles.action__button, styles.plus)}
            onClick={increase}
          >
            <img src="/public/Plus.svg" alt="Добавить в корзину" />
          </button>
        </div>
        <button
          className={classNames(styles.action__button, styles.delete)}
          onClick={remove}
        >
          <img src="/public/Remove.svg" alt="Удалить товар" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
