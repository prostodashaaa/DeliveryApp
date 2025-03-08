import classNames from "classnames";
import Title from "../../components/Title/Title";
import styles from "./Menu.module.css";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";
import IProduct from "../../interfaces/product.interface";
import Loading from "../../components/Loading/Loading";

export function Menu() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [value, setValue] = useState<string>();

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
        params: {
          name,
        },
      });
      setProducts(data);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };

  useEffect(() => {
    getMenu(value);
  }, [value]);

  return (
    <>
      <div className={classNames(styles.menu__header)}>
        <Title>Меню</Title>
        <Search onChange={handleChange}></Search>
      </div>
        {error && <div className={classNames(styles.error)}>{error}</div>}
        {!isLoading && products.length > 0 && (
          <>
            <div className={classNames(styles.menu__products)}>
              <MenuList products={products} />
            </div>
          </>
        )}
        {isLoading && <Loading />}
        {!isLoading && !error && products.length == 0 && <div className={classNames(styles['not-items'])}>Ничего не нашлось</div>}
    </>
  );
}

export default Menu;
