import classNames from "classnames";
import styles from "./Summary.module.css";
import { SummaryProps } from "./Summary.props";

function Summary({ header, price, count, border = true }: SummaryProps) {
  return (
    <div
      className={classNames(styles.summary_item, { [styles.border]: border })}
    >
      <div className={classNames(styles["summary_item-header"])}>
        {header}
        {count && <span className={classNames(styles.count)}>({count})</span>}
      </div>
      <div className={classNames(styles["summary_item-price"])}>
        {price}
        <span className={classNames(styles.ruble)}>&#8381;</span>
      </div>
    </div>
  );
}

export default Summary;
