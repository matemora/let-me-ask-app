import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { LikeButton } from '../LikeButton';
import { DeleteButton } from '../DeleteButton';
import { CheckButton } from '../CheckButton';
import { AnswerButton } from '../AnswerButton';
import './styles.scss';
import { ReactNode } from 'react';

type QuestionProps = {
  children?: ReactNode;
  data: QuestionType;
  roomId: string;
  handleDelete?: (questionId: string) => void;
  admin?: boolean;
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
  data, roomId, children
}: QuestionProps) {
  return (
    <div className="question">
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