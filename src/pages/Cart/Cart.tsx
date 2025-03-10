import classNames from "classnames";
import styles from "./Cart.module.css";
import Title from "../../components/Title/Title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import IProduct from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import Summary from "../../components/Summary/Summary";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";
import Loading from "../../components/Loading/Loading";

const DELIVERY_COUNT = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const profile = useSelector((s: RootState) => s.user.profile);
  const activeUser = useSelector((s: RootState) =>
    s.cart.users.find((user) => user.email == profile?.email)
  );
  const items = activeUser?.items ? activeUser.items : [];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => acc + i, 0);

  const getItem = async (id: number) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
      setIsLoading(false);
      return data;
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  const loadAllItems = async () => {
    try {
      setIsLoading(true);
      const res = await Promise.all(items.map((i) => getItem(i.id)));
      setCartProducts(
        res.filter((item): item is IProduct => item !== undefined)
      );
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  const checkout = async () => {
    axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    if (profile) {
      dispatch(cartActions.clean(profile.email));
      navigate("/success");
    }
  };

  useEffect(() => {
    if (cartProducts.length === 0) {
      loadAllItems();
    }
  }, []);

  return (
    <>
      <Title className={classNames(styles.cart__header)}>{"Корзина"}</Title>
      {!isLoading && items.length > 0 ? (
        <div className={classNames(styles.cart__items)}>
          {items.map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
              return;
            }
            return (
              <CartItem
                key={product.id}
                count={i.count}
                {...product}
              ></CartItem>
            );
          })}
          <div className={classNames(styles.cart__summary)}>
            <Summary header="Итог" price={total} />
            <Summary header="Доставка" price={DELIVERY_COUNT} />
            <Summary
              header="Итог"
              price={total + DELIVERY_COUNT}
              border={false}
              count={items
                .map((i) => {
                  const product = cartProducts.find((p) => p.id === i.id);
                  if (!product) {
                    return 0;
                  }
                  return i.count;
                })
                .reduce((acc, i) => acc + i, 0)}
            />
          </div>
          <Button
            className={classNames(styles.cart_button)}
            appearence="big"
            onClick={checkout}
          >
            {"Оформить"}
          </Button>
        </div>
      ) : (
        !isLoading &&
        !error && (
          <div className={classNames(styles["not-cart"])}>
            В корзине пока ничего нет
          </div>
        )
      )}
      {isLoading && <Loading />}
      {error && <div className={classNames(styles.error)}>{error}</div>}
    </>
  );
}
