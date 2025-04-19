import React, { useState } from 'react';
import './TruthorDare.css';
import coinImage from './coin.png'; // Add your coin image

const truthPrompts = [
  "What's your biggest fear?",
  "Have you ever lied to your best friend?",
  "What's the most embarrassing thing you've done?",
  "If you could be invisible, what would you do?",
  "What's your weirdest habit?",
  "Who was your first crush?",
  "What's the last thing you searched on your phone?",
  "Have you ever broken the law?",
  "If you could swap lives with anyone, who would it be?"
];

const darePrompts = [
  "Do 10 jumping jacks right now!",
  "Sing a song loudly for 30 seconds.",
  "Act like a monkey for 15 seconds.",
  "Post a funny selfie on your status.",
  "Dance without music for 20 seconds.",
  "Talk in a cartoon voice for 2 mins.",
  "Spin around 5 times and walk straight.",
  "Do a weird face and keep it for 1 minute.",
  "Speak with your eyes closed for 2 minutes."
];

export default function TruthOrDare() {
  const [flipResult, setFlipResult] = useState(null);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [promptType, setPromptType] = useState(null);
  const [usedTruths, setUsedTruths] = useState([]);
  const [usedDares, setUsedDares] = useState([]);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [showPromptOptions, setShowPromptOptions] = useState(false);

  const flipCoin = () => {
    setFinalPrompt('');
    setPromptType(null);
    setCoinFlipping(true);
    setShowPromptOptions(false);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'Truth' : 'Dare';
      setFlipResult(result);
      setPromptType(result.toLowerCase());
      setShowPromptOptions(true);
      setCoinFlipping(false);
    }, 1500);
  };

  const getRandomPrompt = (type) => {
    const prompts = type === 'truth' ? truthPrompts : darePrompts;
    const used = type === 'truth' ? usedTruths : usedDares;
    const available = prompts.filter(p => !used.includes(p));

    if (available.length === 0) {
      setFinalPrompt("No more prompts left! 🎉");
      return;
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    type === 'truth'
      ? setUsedTruths([...usedTruths, chosen])
      : setUsedDares([...usedDares, chosen]);

    setFinalPrompt(chosen);
  };

  return (
    <div className="truth-dare-container">
      <h2>🪙 Truth or Dare</h2>

      <button className="flip-btn" onClick={flipCoin} disabled={coinFlipping}>
        {coinFlipping ? 'Flipping...' : 'Flip the Coin'}
      </button>

      {coinFlipping && (
        <div className="coin-area">
          <img src={coinImage} alt="coin" className="coin-spin" />
        </div>
      )}

      {flipResult && !coinFlipping && (
        <div className="result">
          <p>🌀 It's <strong>{flipResult}</strong>!</p>

          {showPromptOptions && (
            <div className="prompt-choice">
              <button onClick={() => getRandomPrompt(promptType)}>🎲 Let Random Pick</button>
              <button onClick={() => setFinalPrompt('📝 You chose to pick your own prompt!')}>
                ✍️ I’ll Pick Myself
              </button>
            </div>
          )}
        </div>
      )}

      {finalPrompt && (
        <div className="final-prompt-box">
          <p>{finalPrompt}</p>
        </div>
      )}
    </div>
  );
}
