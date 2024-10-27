import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeSocket } from "socket/socket";
import CreateQuizSession from "./pages/CreateQuizSession";
import QuizSession from "pages/QuizSession";

const App: React.FC = () => {
  useEffect(() => {
    initializeSocket("http://localhost:3000");
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateQuizSession />} />
        <Route path="/quiz/:sessionId" element={<QuizSession />} />
      </Routes>
    </Router>
  );
};

export default App;
