import classNames from "classnames";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link
      to={`/product/${props.id}`}
      className={classNames(styles["link-product-card"])}
    >
      <div className={classNames(styles["product-card"])}>
        <div className={classNames(styles["product-card__image"])}>
          <img src={props.image} alt="Фото блюда" />
        </div>
        <div className={classNames(styles["product-card__price"])}>
          {props.price}
          <span className={classNames(styles.ruble)}>&#8381;</span>
        </div>
        <div className={classNames(styles["product-card__rating"])}>
          {props.rating}
          <img src="/DeliveryApp/Rating.svg" alt="Оценка" />
        </div>
        <button className={classNames(styles["add-cart"])} onClick={add}>
          <img src="/DeliveryApp/CartButton.svg" alt="Добавить в корзину" />
        </button>
        <div className={classNames(styles["product-card__description"])}>
          <h2 className={classNames(styles["description__title"])}>
            {props.name}
          </h2>
          <p className={classNames(styles["description__composition"])}>
            {props.ingredients}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
