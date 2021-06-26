import { ReactNode } from 'react';
import clsx from 'classnames';
import './styles.scss';

type QuestionProps = {
  children?: ReactNode;
  data: QuestionType;
};

export type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  userLikeId: string | undefined;
};

export function Question({
  data, children
}: QuestionProps) {
  return (
    <div className={clsx(
      'question',
      { answered: data.isAnswered },
      { highlighted: data.isHighlighted },
    )}>
      <p>{data.content}</p>
      <footer>
        <div className="user-info">
          <img src={data.author.avatar} alt={data.author.name} />
          <span>{data.author.name}</span>
        </div>
        <div className="actions">
          {children}
        </div>
      </footer>
    </div>
  );
}