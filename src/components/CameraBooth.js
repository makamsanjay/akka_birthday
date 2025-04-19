import React, { useState } from 'react';
import NormalBooth from './booths/NormalBooth';
import MagicBooth from './booths/MagicBooth';
import './CameraBooth.css';

export default function CameraBooth() {
  const [activeBooth, setActiveBooth] = useState('normal');

  return (
    <div className="camera-switcher">
      <h2>📸 Birthday Camera Booth</h2>
      <div className="switch-buttons">
        <button onClick={() => setActiveBooth('normal')}>Normal Booth</button>
        <button onClick={() => setActiveBooth('magic')}>Magic Filter Booth</button>
      </div>

      {activeBooth === 'normal' && <NormalBooth />}
      {activeBooth === 'magic' && <MagicBooth />}
    </div>
  );
}
