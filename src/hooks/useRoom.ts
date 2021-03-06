import { useEffect, useState } from "react";
import { QuestionType } from "../components/Question";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>;

export function useRoom(roomId: string) {
  const {user} = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', room => {
      const parsedQuestions = Object.entries(room.val().questions as FirebaseQuestions ?? {}).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          userLikeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });
      setTitle(room.val().title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { questions, title }
}