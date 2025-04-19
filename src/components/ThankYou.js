import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './ThankYou.css';

export default function ThankYou() {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="thankyou-section">
      <h2 className="thankyou-title">Once again happy birthday.</h2>
      <p className="thankyou-msg">
      Hope you like this! 
      </p>

      <div className="thankyou-buttons">
        <button onClick={() => window.scrollTo(0, 0)}>🔁 Replay</button>
        <button onClick={() => navigator.share?.({ title: "Birthday Website", url: window.location.href })}>📤 Share</button>
      </div>
    </div>
  );
}
