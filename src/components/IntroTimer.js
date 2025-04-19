import React, { useEffect, useState } from 'react';
import './IntroTimer.css';

export default function IntroTimer({ onComplete }) {
  const [displayTime, setDisplayTime] = useState('01:00:00');

  useEffect(() => {
    let start = 3600; // 1 hour in seconds
    const end = 0;
    const duration = 2000; // total animation time (ms)
    const frameRate = 30; // update every ~33ms
    const totalFrames = duration / (1000 / frameRate);
    let currentFrame = 0;

    const interval = setInterval(() => {
      const progress = currentFrame / totalFrames;
      const currentTime = Math.floor(start - (start - end) * progress);

      const h = String(Math.floor(currentTime / 3600)).padStart(2, '0');
      const m = String(Math.floor((currentTime % 3600) / 60)).padStart(2, '0');
      const s = String(currentTime % 60).padStart(2, '0');
      setDisplayTime(`${h}:${m}:${s}`);

      currentFrame++;
      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        onComplete(); // trigger main screen
      }
    }, 1000 / frameRate);
  }, [onComplete]);

  return (
    <div className="intro-timer">
      <h1 className="fast-countdown">{displayTime}</h1>
      <p className="wait-msg">Getting things ready for Bhargavi’s Day 🎉</p>
    </div>
  );
}
