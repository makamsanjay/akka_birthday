import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import './MagicBooth.css';

const filters = [
  'none',
  'pop-glow',
  'warp-zone',
  'sparkle-queen',
  'party-mood',
  'ghost-mode'
];

export default function MagicBooth() {
  const webcamRef = useRef(null);
  const frameRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState('none');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
      {!photo ? (
        <>
          <div className={`magic-frame ${activeFilter}`} ref={frameRef}>
          <Webcam
  ref={webcamRef}
  width={400}
  height={300}
  screenshotFormat="image/png"
  screenshotQuality={1}
/>

<div className={`magic-frame ${activeFilter}`}>
  <img src={photo} alt="Captured" width="400" />
  <div className="frame-banner">🎉 It’s Bhargavi’s Day 🎉</div>
</div>

          </div>

          <div className="filter-controls">
            <p>✨ Pick a Filter:</p>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}>{f.replace('-', ' ')}</button>
            ))}
            <button onClick={() => setActiveFilter('none')}>❌ Remove All</button>
          </div>

          <button onClick={capture}>📸 Capture</button>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" style={{ width: 400, borderRadius: 16 }} />
          <br />
          <a href={photo} download="magic-booth.png"><button>💾 Download</button></a>
          <button onClick={() => setPhoto(null)}>🔁 Retake</button>
        </>
      )}
    </div>
  );
}
