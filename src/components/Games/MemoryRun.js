import React, { useEffect, useRef, useState } from 'react';
import './MemoryRun.css';

const eggImages = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
];

export default function MemoryRunGame() {
  const gameRef = useRef(null);
  const [characterX, setCharacterX] = useState(0);
  const [running, setRunning] = useState(false);
  const [collectedPhotos, setCollectedPhotos] = useState([]);

  const [eggPositions, setEggPositions] = useState([
    { x: 400, image: eggImages[0] },
    { x: 800, image: eggImages[1] },
    { x: 1200, image: eggImages[2] },
    { x: 1600, image: eggImages[3] },
  ]);

  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    let animationFrame;
    const speed = 4;

    const move = () => {
      setCharacterX(prev => {
        const newX = prev + speed;
        checkCollision(newX);
        return newX;
      });
      animationFrame = requestAnimationFrame(move);
    };

    if (running) {
      animationFrame = requestAnimationFrame(move);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [running]);

  const checkCollision = (newX) => {
    setEggPositions(prev => {
      return prev.filter(egg => {
        if (Math.abs(newX - egg.x) < 40) {
          setCollectedPhotos(p => [...p, egg.image]);
          setActivePhoto(egg.image);
          return false;
        }
        return true;
      });
    });
  };

  return (
    <div className="memory-run-container">
      <button className="start-btn" onClick={() => setRunning(true)}>Start 🏁</button>

      <div className="game-area" ref={gameRef}>
        <div className="character" style={{ left: `${characterX}px` }}>
          <img src="/images/character.gif" alt="runner" />
        </div>

        {eggPositions.map((egg, i) => (
          <img
            key={i}
            src="/images/egg.png"
            className="egg"
            style={{ left: `${egg.x}px` }}
            alt="egg"
          />
        ))}
      </div>

      {activePhoto && (
        <div className="photo-modal" onClick={() => setActivePhoto(null)}>
          <img src={activePhoto} alt="memory" />
        </div>
      )}

      {collectedPhotos.length > 0 && (
        <div className="photo-gallery">
          <h3>📸 Collected Memories</h3>
          <div className="gallery-grid">
            {collectedPhotos.map((img, idx) => (
              <img key={idx} src={img} alt="thumb" onClick={() => setActivePhoto(img)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}