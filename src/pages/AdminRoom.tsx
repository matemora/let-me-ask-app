import { useParams } from "react-router-dom";
import { Question } from "../components/Question";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask_logo" />
          <div>
            <RoomCode code={roomId} />
            <Button>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (<span>{questions.length} pergunta{questions.length > 1 ? 's' : ''}</span>)}
        </div>
        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
            />
          ))}
        </div>
      </main>
    </div>
  )
}