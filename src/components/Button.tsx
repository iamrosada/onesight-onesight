import classNames from "classnames";
import styles from "./button.module.scss";

type Props = JSX.IntrinsicElements["button"];

export default function Button({
  children,
  onClick,
  className,
  disabled,
  title,
  ...props
}: Props) {
  return (
    <button
      {...props}
      title={title}
      aria-label={title?.toLocaleLowerCase() || "button"}
      onClick={(e) => !disabled && onClick && onClick(e)}
      className={classNames(
        styles["button-color"],
        disabled && styles["cursor-not-allowed"],
        className
      )}
    >
      {children}
    </button>
  );
}
