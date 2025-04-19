import React, { useState } from 'react';
import './SpinWheel.css';

const options = [
  "Open gift box",
  "laugh as much as you can",
  "sing with your barre voice",
  "no expression face",
  "open gift box",
  "recreate chicken bannana reel",

];

export default function SpinWheel() {
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState(null);

  const spin = () => {
    const extraSpins = 5 * 360;
    const randomSlice = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;
    const targetAngle = 360 - randomSlice * sliceAngle - sliceAngle / 2;
    const totalAngle = angle + extraSpins + targetAngle;

    setAngle(totalAngle);
    setResult(null); // reset previous

    setTimeout(() => {
      setResult(options[randomSlice]);
    }, 2500);
  };

  return (
    <div className="spin-container">
      <h2 className="spin-title">🎡 Spin the Fun Wheel</h2>

      <div className="wheel-wrap">
        <div className="pin">🔻</div>
        <div className="wheel" style={{ transform: `rotate(${angle}deg)` }}>
        {options.map((opt, i) => {
  const rotation = i * (360 / options.length);
  return (
    <div
      key={i}
      className="segment"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span
        style={{
          transform: `rotate(${360 / options.length / 2}deg) translateX(40%)`,
          transformOrigin: '0 0',
        }}
      >
        {opt}
      </span>
    </div>
  );
})}

        </div>
      </div>

      <button onClick={spin} className="spin-btn">SPIN 🎲</button>
      {result && <p className="result-msg">🎯 {result}</p>}
    </div>
  );
}
