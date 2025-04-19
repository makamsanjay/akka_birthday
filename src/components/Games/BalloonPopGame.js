import React, { useState } from 'react';
import './BalloonPopGame.css';
import img1 from './recreate1.jpeg';
import img2 from './recreate2.jpeg';
import img3 from './recreate3.jpg';
import img4 from './recreate4.jpg';
import img5 from './recreate5.jpg';
import balloonImg from './ballon.png';

const allPhotos = [img1, img2, img3, img4, img5];

const getRandomPhotos = (count) => {
  const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function BalloonPopGame() {
  const [poppedBalloons, setPoppedBalloons] = useState([]);
  const [assignedPhotos, setAssignedPhotos] = useState(getRandomPhotos(3));
  const [confettiIndex, setConfettiIndex] = useState(null);

  const handlePop = (index) => {
    if (!poppedBalloons.includes(index)) {
      setPoppedBalloons([...poppedBalloons, index]);
      setConfettiIndex(index);
      setTimeout(() => setConfettiIndex(null), 1500);
    }
  };

  return (
    <div className="balloon-game-container">
      <h2 className="balloon-title">Can you recreate 3 random memories?</h2>
      <div className="balloon-row">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`balloon ${poppedBalloons.includes(index) ? 'popped' : ''}`}
            onClick={() => handlePop(index)}
          >
            {!poppedBalloons.includes(index) ? (
              <img src={balloonImg} alt="Balloon" />
            ) : (
              <img
                src={assignedPhotos[index]}
                alt="Memory"
                className="popped-photo"
              />
            )}
            {confettiIndex === index && <div className="confetti"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
