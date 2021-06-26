import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question, QuestionType } from '../components/Question';
import { LikeButton } from '../components/LikeButton';

import '../styles/room.scss';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function Room() {
  const { user, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { questions, title } = useRoom(roomId);

  // refatorar room para contexto

  const handleSignIn = async () => {
    if (!user) {
      await signInWithGoogle();
    }
  }

  async function handleLikeButtonClick(question: QuestionType) {
    if (question.userLikeId) {
      await database.ref(`rooms/${roomId}/questions/${question.id}/likes/${question.userLikeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${question.id}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in!');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <Header>
        <RoomCode code={roomId} />
      </Header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (<span>{questions.length} pergunta{questions.length > 1 ? 's' : ''}</span>)}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="Compartilhe sua pergunta!"
            onChange={e => setNewQuestion(e.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button onClick={handleSignIn}>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              data={question}
            >
              {!question.isAnswered && (
                <LikeButton
                  likeCount={question.likeCount}
                  liked={Boolean(question.userLikeId)}
                  handleClick={() => handleLikeButtonClick(question)}
                />
              )}
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}