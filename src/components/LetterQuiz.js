import React, { useState } from 'react';
import './LetterQuiz.css';

const questions = [
  {
    q: "Fav food?",
    options: ["sweets", "icecream", "chocolate", "pizza"],
    answer: "sweets"
  },
  {
    q: "Fav Desert?",
    options: ["cheese cake", "Tiramisu", "icecream", "waffle"],
    answer: "Tiramisu"
  },
  {
    q: "fav chicken item?",
    options: ["gizzards", "wings", "leg piece", "breast"],
    answer: "gizzards"
  },
  {
    q: "what are you obsessed with?",
    options: ["gym", "oiling", "cleanliness", "cooking"],
    answer: "cleanliness"
  },
];

export default function LetterQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSelect = (qIdx, option) => {
    setAnswers({ ...answers, [qIdx]: option });
  };

  const checkAnswers = () => {
    const correct = questions.every((q, idx) => answers[idx] === q.answer);
    setSubmitted(true);
    setUnlocked(correct);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">💌 Unlock the Birthday Letter</h2>

      {questions.map((q, idx) => (
        <div key={idx} className="question-block">
          <p>{q.q}</p>
          <div className="options">
            {q.options.map((opt) => (
              <button
                key={opt}
                className={`opt-btn ${answers[idx] === opt ? 'selected' : ''}`}
                onClick={() => handleSelect(idx, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button onClick={checkAnswers} className="submit-btn">Submit Answers</button>

      {submitted && !unlocked && (
        <p className="error-msg">Oops! Try again. You missed something 🙈</p>
      )}

      {unlocked && (
        <div className="letter-card">
          <h3>🎉 Hi nana,</h3>
          <p>
          "Happy birthday to the one who's miles away but close to my heart. ..
          </p>
          <p>Love,<br/>kukka pilla ✨</p>
          <br/>
          <h3>🎉 Hey akka,</h3>
          <p>
            Happiest birthday, Thanks for taking care of me.
            okok next next.
          </p>
          <p>sweet,<br/>gadidha ✨</p>
        </div>
      )}
    </div>
  );
}
