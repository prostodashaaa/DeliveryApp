import styles from "./Input.module.css";
import cn from "classnames";
import { InputProps } from "./Input.props";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid = true, className, placeholder, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className={cn(styles["input"], className, {
        [styles["invalid"]]: !isValid,
      })}
      {...props}
    />
  );
});

export default Input;
