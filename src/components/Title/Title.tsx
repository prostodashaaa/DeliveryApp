import styles from "./Title.module.css";
import { TitleProps } from "./Title.props";
import classNames from "classnames";

function Title({ children, className, ...props }: TitleProps) {
  return (
    <h1 className={classNames(styles.title, className)} {...props}>
      {children}
    </h1>
  );
}

export default Title;
