import React, { useState } from 'react';
import './GiftReveal.css';
import gift1 from './giftrev.png';
import gift2 from './giftipad.png';
import gift3 from './giftbag.png'
import sparkle from './giftsparkle.png';
import popSound from './test.png';
import GiftImage from './giftbox.png';

const GiftReveal = () => {
  const [revealed, setRevealed] = useState([false, false, false, false, false]);
  const [assignments, setAssignments] = useState(shuffleGifts());
  const audio = new Audio(popSound);

  function shuffleGifts() {
    const contents = [gift1, gift2, gift3, null, null];
    return contents.sort(() => 0.5 - Math.random());
  }

  const handleClick = (i) => {
    if (revealed[i]) return;
    audio.play();
    const updated = [...revealed];
    updated[i] = true;
    setRevealed(updated);
  };

  const handleReset = () => {
    setAssignments(shuffleGifts());
    setRevealed([false, false, false, false, false]);
  };

  return (
    <div className="gift-section">
      <h2 className="gift-title">🎁 Choose a Gift Box!</h2>
      <div className="gift-boxes">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="gift-box" onClick={() => handleClick(i)}>
            {!revealed[i] ? (
              <img src={GiftImage} alt="Gift Box" />
            ) : assignments[i] ? (
              <div className="gift-reveal">
                <img src={assignments[i]} alt="Gift" className="gift-image" />
                <img src={sparkle} alt="Sparkle" className="sparkle" />
              </div>
            ) : (
              <p className="empty-msg">😅 Oops, no gift here!</p>
            )}
          </div>
        ))}
      </div>
      <button className="reset-btn" onClick={handleReset}>🔁 Try Again</button>
    </div>
  );
};

export default GiftReveal;
