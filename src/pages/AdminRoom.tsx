import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";
import { Question, QuestionType } from "../components/Question";
import { Button } from "../components/Button";
import { Logout } from "../components/Logout";
import { Header } from "../components/Header";
import { useRoom } from "../hooks/useRoom";
import { DeleteIcon } from "../components/DeleteButton/DeleteIcon";
import { Modal } from "../components/Modal";
import { CloseCircleIcon } from "../components/CloseCircleIcon";
import { CheckButton } from "../components/CheckButton";
import { AnswerButton } from "../components/AnswerButton";
import { DeleteButton } from "../components/DeleteButton";
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const [showCloseRoomModal, setShowCloseRoomModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState('');

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });
    setShowCloseRoomModal(false);
  }

  const handleDeleteQuestion = useCallback(async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setQuestionToDelete('');
  }, [roomId]);

  const handleMarkQuestionAsAnswered = useCallback(async (question: QuestionType) => {
    await database.ref(`rooms/${roomId}/questions/${question.id}`).update({
      isAnswered: !question.isAnswered,
    });
  }, [roomId]);

  const handleHighlightQuestion = useCallback(async (question: QuestionType) => {
    await database.ref(`rooms/${roomId}/questions/${question.id}`).update({
      isHighlighted: !question.isHighlighted,
    });
  }, [roomId]);

  return (
    <div id="page-room">
      <Header>
        <Button
          isOutlined
          onClick={() => setShowCloseRoomModal(true)}
        >
          Encerrar sala
        </Button>
        <Logout />
      </Header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (<span>{questions.length} pergunta{questions.length > 1 ? 's' : ''}</span>)}
        </div>
        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              data={question}
            >
              {!question.isAnswered && (
                <>
                  <CheckButton
                    onClick={() => handleMarkQuestionAsAnswered(question)}
                  />
                  <AnswerButton
                    isHighlighted={question.isHighlighted && !question.isAnswered}
                    onClick={() => handleHighlightQuestion(question)}
                  />
                </>
              )}
              <DeleteButton
                onClick={() => setQuestionToDelete(question.id)}
              />
            </Question>
          ))}
        </div>
      </main>
      <Modal
        icon={<DeleteIcon color="#E73F5D" />}
        showModal={questionToDelete !== ''}
        title="Excluir pergunta"
        subtitle="Tem certeza que você deseja excluir esta pergunta?"
        confirmButton={
          <Button
            variation="danger"
            onClick={() => handleDeleteQuestion(questionToDelete)}
          >
            Sim, excluir
          </Button>
        }
        cancelButton={
          <Button
            variation="cancel"
            onClick={() => setQuestionToDelete('')}
          >
            Cancelar
          </Button>
        }
      />
      <Modal
        showModal={showCloseRoomModal}
        icon={<CloseCircleIcon />}
        title="Encerrar sala"
        subtitle="Tem certeza que você deseja encerrar esta sala?"
        confirmButton={
          <Button
            variation="danger"
            onClick={handleCloseRoom}
          >
            Sim, encerrar
          </Button>
        }
        cancelButton={
          <Button
            variation="cancel"
            onClick={() => setShowCloseRoomModal(false)}
          >
            Cancelar
          </Button>
        }
      />
    </div>
  )
}