import React, { useState, useEffect } from "react";
import api from "../api/api";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const CreateQuizSession: React.FC = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = () => {
    if (localStorage.getItem('userId')) {
      setUserId(localStorage.getItem('userId') || '');
    } else {
      const userId = uuidv4();
      setUserId(userId);
      localStorage.setItem('userId', userId);
    }
  }

  const createQuizSession = async () => {
    try {
      setLoading(true);
      const response = await api.post("/quiz");
      
      // Emit event create new quiz session
      socket.emit("createNewQuizSession", response.data.quizId);
      await api.post("/quiz/join", { quizId: response.data.quizId, userId });
      setSessionId(response.data.quizId);

      navigate(`/quiz/${response.data.quizId}`);
    } catch (error) {
      console.error("Failed to create quiz session", error);
    } finally {
      setLoading(false);
    }
  };

  const joinQuizSession = async () => {
    if (!sessionId) {
      alert("Please enter a session ID to join.");
    }
    
    try {
      await api.post("/quiz/join", { quizId: sessionId, userId });
      navigate(`/quiz/${sessionId}`);
    } catch(error) {
      console.log(`Could not join the session due to error ${(error as any).message}`)
    }
  };

  return (
    <div>
      <h1>Quiz Session</h1>
      <button onClick={createQuizSession} disabled={loading}>
        {loading ? "Creating..." : "Create Quiz Session"}
      </button>

      <h2>Or Join an Existing Quiz Session</h2>
      <input
        type="text"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        placeholder="Enter Session ID"
      />
      <button onClick={joinQuizSession}>Join Quiz Session</button>
    </div>
  );
};

export default CreateQuizSession;
