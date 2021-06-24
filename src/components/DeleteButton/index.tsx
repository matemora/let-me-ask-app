import { ButtonHTMLAttributes } from "react";
import { DeleteIcon } from "./DeleteIcon";
import './styles.scss';

type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function DeleteButton({
  onClick,
}: DeleteButtonProps) {
  return (
    <button
      className="delete-button"
      type="button"
      aria-label="Excluir questão"
      onClick={onClick}
    >
      <DeleteIcon />
    </button>
  );
}