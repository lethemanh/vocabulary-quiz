import React, { useEffect } from "react";
import { socket } from "../socket/socket";

const QuizSession: React.FC = () => {
  useEffect(() => {
    socket.on("userJoined", (data: { quizId: string; questions: any[]; }) => {
      alert('A new user join into session');
    });
  }, []);

  return (
    <div>
      <h1>Quiz Session</h1>
      <h2>Please wait util the session is started</h2>
    </div>
  );
};

export default QuizSession;
