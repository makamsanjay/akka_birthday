import React, { useEffect, useState } from 'react';
import './MemoryGame.css';

const imageSet = [
  "/memory/find1.jpeg",
  "/memory/find2.jpeg",
  "/memory/find3.jpeg",
  "/memory/find4.jpeg",
  "/memory/find5.jpeg",
  "/memory/find6.jpeg"
];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const deck = [...imageSet, ...imageSet]
      .sort(() => Math.random() - 0.5)
      .map((src, idx) => ({ id: idx, src }));
    setCards(deck);
  }, []);

  const handleFlip = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;
    setFlipped([...flipped, card.id]);

    if (flipped.length === 1) {
      const firstCard = cards.find(c => c.id === flipped[0]);
      if (firstCard.src === card.src) {
        setMatched([...matched, firstCard.id, card.id]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="memory-container">
      <h2 className="memory-title">🧠 Match the Birthday Photos!</h2>
      <div className="memory-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card ${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => handleFlip(card)}
          >
            <div className="front">❓</div>
            <div className="back">
              <img src={card.src} alt="memory" className="card-image" />
            </div>
          </div>
        ))}
      </div>
      {matched.length === cards.length && <p className="win-msg">🎉 You matched them all!</p>}
    </div>
  );
}