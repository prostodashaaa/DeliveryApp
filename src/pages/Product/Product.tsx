import classNames from "classnames";
import styles from "./Product.module.css";
import { useLoaderData } from "react-router-dom";
import IProduct from "../../interfaces/product.interface";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";

export function Product() {
  const data = useLoaderData() as IProduct;

  return (
    <div className={classNames(styles.product__section)}>
      <div className={classNames(styles.product__header)}>
        <div className={classNames(styles.header_left)}>
          <button className={classNames(styles.button_back)}>
            <img src="/DeliveryApp/Back.svg" alt="Назад" />
          </button>
          <Title>{data.name}</Title>
        </div>
        <Button className={classNames(styles.button_add)}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
