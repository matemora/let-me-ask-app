import { ButtonHTMLAttributes } from "react";
import { LikeIcon } from "./LikeIcon";
import '../styles/like-button.scss';

type LikeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  liked?: boolean;
  likeCount: number;
  handleClick: () => void;
}

export function LikeButton({
  likeCount, liked = false, handleClick,
}: LikeButtonProps) {
  return (
    <button
      className={`like-button ${liked && 'liked'}`}
      type="button"
      aria-label="Marcar como gostei"
      onClick={handleClick}
    >
      {likeCount !== 0 && (<span>{likeCount}</span>)}
      <LikeIcon />
    </button>
  );
}