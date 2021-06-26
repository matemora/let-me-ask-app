import { ButtonHTMLAttributes } from "react";
import { AnswerIcon } from './AnswerIcon';
import './styles.scss';

type AnswerButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function AnswerButton({
  onClick
}: AnswerButtonProps) {
  return (
    <button
      className="answer-button"
      type="button"
      aria-label="Destacar questão sendo respondida"
      onClick={onClick}
    >
      <AnswerIcon />
    </button>
  );
}