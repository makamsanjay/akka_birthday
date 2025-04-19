import React, { useState, useEffect } from 'react';
import './VideoGate.css';
import confetti from 'canvas-confetti';

import video1 from './videonote1.mp4';
import video2 from './videonote2.mp4';
import video3 from './videonote3.mp4';
import video4 from './videonote4.mp4';
import video5 from './videonote5.mp4';

const questions = [
  {
    text: "What is your ipad color?",
    answer: "grey",
    placeholder: "Hint: new ipad..."
  },
  { text: "Whats your fav car brand?", answer: "kia", placeholder: "Hint: three letter" },
  { text: "which shift do you like most in gracie's?", answer: "cash", placeholder: "brett" },
  { text: "who is India's president?", answer: "murmu", placeholder: "Hint: 5 letters and starts with 'm'" }

];

const videos = [video1, video2, video3, video4, video5];

const playSound = () => {
  const audio = new Audio('/sounds/unlock.mp3');
  audio.play();
};

export default function VideoGate() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [verified, setVerified] = useState(false);
  const [denied, setDenied] = useState(false);
  const [finalStep, setFinalStep] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (step === 6 && !finalStep) {
      if (score >= 3) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
        playSound();
        setVerified(true);
      } else {
        setFailed(true);
      }
      setFinalStep(true);
    }
  }, [step, finalStep, score]);

  const handleAnswer = () => {
    if (questions[questionIndex] && input.trim().toLowerCase() === questions[questionIndex].answer) {
      setScore(prev => prev + 1);
    }
    setInput('');
    setQuestionIndex(prev => prev + 1);
    setStep(prev => prev + 1);
  };

  const handleStart = () => {
    if (input.trim().toLowerCase() === questions[0].answer) {
      setStep(1);
    } else {
      alert("Oops! Try again");
    }
    setInput('');
  };

  const resetAll = () => {
    setDenied(false);
    setFailed(false);
    setStep(0);
    setScore(0);
    setInput('');
    setFinalStep(false);
    setQuestionIndex(1);
    setVerified(false);
  };

  if (verified) {
    return (
      <div className="video-section">
        <h3>🎬 Secret Videos</h3>
        <div className="video-grid">
          {videos.map((src, idx) => (
            <video key={idx} controls width="300">
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    );
  }

  if (failed) {
    return (
      <div>
        <p className="sorry-msg">❌ Not enough answers correct. Try again later. But scroll down and enjoy the rest 🎉</p>
        <button className="retake-btn" onClick={resetAll}>🔁 Retake</button>
      </div>
    );
  }

  return (
    <div className="video-gate">
      {denied && (
        <div>
          <p className="sorry-msg">Sorry, can't open this. But scroll down and enjoy the rest 🎉</p>
          <button className="retake-btn" onClick={resetAll}>🔁 Retake</button>
        </div>
      )}

      {!denied && !finalStep && step === 0 && (
        <div>
          <h3>🔐 Secret Videos Unlock</h3>
          <p>{questions[0].text}</p>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={questions[0].placeholder}
          />
          <button onClick={handleStart}>Submit</button>
        </div>
      )}

      {!denied && step === 1 && (
        <div>
          <p>Are you sure you are Bhargavi?</p>
          <button onClick={() => { setStep(2); setInput(''); }}>Yes</button>
          <button onClick={() => setDenied(true)}>No</button>
        </div>
      )}

      {!denied && step === 2 && (
        <div>
          <p>Okay, let me confirm that you are Bhargavi by asking 3 more questions.</p>
          <button onClick={() => { setStep(3); setInput(''); }}>Continue</button>
        </div>
      )}

      {!denied && step >= 3 && step <= 5 && questions[questionIndex] && (
        <div>
          <p>{questions[questionIndex].text}</p>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={questions[questionIndex].placeholder}
          />
          <button onClick={handleAnswer}>Next</button>
        </div>
      )}

      {!denied && step === 6 && !finalStep && (
        <div>
          <p>Checking your answers...</p>
        </div>
      )}
    </div>
  );
}
