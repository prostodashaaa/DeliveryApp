import classNames from "classnames";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={classNames(styles["loader-container"])}>
      <div className={classNames(styles.loader)}>
        <div className={classNames(styles["inner-circle"])}></div>
      </div>
    </div>
  );
}

export default Loading;
