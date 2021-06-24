import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { LikeButton } from '../LikeButton';
import { DeleteButton } from '../DeleteButton';
import './styles.scss';

type QuestionProps = {
  data: QuestionType;
  roomId: string;
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
  data, roomId, admin = false,
}: QuestionProps) {
  const { user } = useAuth();

  async function handleLikeButtonClick() {
    if (data.userLikeId) {
      await database.ref(`rooms/${roomId}/questions/${data.id}/likes/${data.userLikeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${data.id}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  async function handleDeleteButtonClick() {
    if (window.confirm('Tem certeza que deseja excluir essa questão?')) {
      await database.ref(`rooms/${roomId}/questions/${data.id}`).remove();
    }
  }

  return (
    <div className="question">
      <p>{data.content}</p>
      <footer>
        <div className="user-info">
          <img src={data.author.avatar} alt={data.author.name} />
          <span>{data.author.name}</span>
        </div>
        <div className="actions">
          {admin ? (
            <>
              <DeleteButton
                onClick={handleDeleteButtonClick}
              />
            </>
          ) : (
            <LikeButton
              likeCount={data.likeCount}
              liked={Boolean(data.userLikeId)}
              handleClick={handleLikeButtonClick}
            />
          )}
        </div>
      </footer>
    </div>
  );
}