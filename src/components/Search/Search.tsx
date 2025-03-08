import classNames from "classnames";
import styles from "./Search.module.css";

function Search({...props}) {
  return (
    <div className={classNames(styles.search)}>
      <img src="/public/Search.svg" alt="Поиск" />
      <input
        className={classNames(styles.input)}
        type="text"
        placeholder="Введите блюдо или состав"
        {...props}
      />
    </div>
  );
}

export default Search;
