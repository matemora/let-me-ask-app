import { ButtonHTMLAttributes } from "react";
import { CheckIcon } from './CheckIcon';
import './styles.scss';

type CheckButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CheckButton({
  onClick
}: CheckButtonProps) {
  return (
    <button
      className="check-button"
      type="button"
      aria-label="Marcar questão como respondida"
      onClick={onClick}
    >
      <CheckIcon />
    </button>
  );
}