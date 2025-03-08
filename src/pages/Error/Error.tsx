import classNames from "classnames";
import styles from './Error.module.css'

export function Error() {
  return <div className={classNames(styles.error)}>Такой страницы не существует</div>;
}
