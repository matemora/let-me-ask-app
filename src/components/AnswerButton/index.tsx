import { ButtonHTMLAttributes } from "react";
import { AnswerIcon } from './AnswerIcon';
import clsx from 'classnames';
import './styles.scss';

type AnswerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isHighlighted?: boolean;
};

export function AnswerButton({
  isHighlighted, onClick
}: AnswerButtonProps) {
  return (
    <button
      className={clsx('answer-button', { highlighted: isHighlighted })}
      type="button"
      aria-label="Destacar questão sendo respondida"
      onClick={onClick}
    >
      <AnswerIcon />
    </button>
  );
}