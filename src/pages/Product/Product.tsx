import classNames from "classnames";
import styles from "./Product.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import IProduct from "../../interfaces/product.interface";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { MouseEvent } from "react";

export function Product() {
  const data = useLoaderData() as IProduct;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);

  const add = (e: MouseEvent) => {
    e.preventDefault();
    if (profile) {
      dispatch(cartActions.add({ id: data.id, email: profile.email }));
    }
  };

  return (
    <div className={classNames(styles.product__section)}>
      <div className={classNames(styles.product__header)}>
        <div className={classNames(styles.header_left)}>
          <button
            className={classNames(styles.button_back)}
            onClick={() => navigate("/")}
          >
            <img src="/DeliveryApp/Back.svg" alt="Назад" />
          </button>
          <Title>{data.name}</Title>
        </div>
        <Button className={classNames(styles.button_add)} onClick={add}>
          <img src="/DeliveryApp/CartButton.svg" alt="Добавить в корзину" />
          {"В корзину"}
        </Button>
      </div>
      <div className={classNames(styles.product__main)}>
        <div className={classNames(styles.product__image)}>
          <img src={data.image} alt="Картинка товара" />
        </div>
        <div className={classNames(styles.product__description)}>
          <div className={classNames(styles.product__price)}>
            <div className={classNames(styles.product__text)}>Цена</div>
            <div className={classNames(styles.product__cost)}>
              {data.price}
              <span className={classNames(styles.ruble)}>&#8381;</span>
            </div>
          </div>
          <div className={classNames(styles.product__rate)}>
            <div className={classNames(styles.product__text)}>Рейтинг</div>
            <div className={classNames(styles.product__rating)}>
              {data.rating}
              <img src="/DeliveryApp/Rating.svg" alt="Оценка" />
            </div>
          </div>
          <div className={classNames(styles.product__ingredients)}>
            <div className={classNames(styles.ingredients__title)}>Состав</div>
            <ul className={classNames(styles.ingredients__items)}>
              {data.ingredients.map((i) => (
                <li
                  key={`${data.id}-${i}`}
                  className={classNames(styles.ingredients__item)}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
