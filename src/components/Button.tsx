import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  variation?: "danger" | "primary" | "cancel";
}

export function Button({
  isOutlined = false, variation, ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${variation} ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
    );
};
