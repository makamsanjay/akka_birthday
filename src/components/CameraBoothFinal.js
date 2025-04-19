import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import './CameraBoothFinal.css';

const filters = ['none', 'sepia', 'cool', 'pink', 'vibrant', 'grayscale', 'funky', 'dreamy'];
const frames = ['none', 'bhargavi', 'confetti', 'myday', 'neon', 'filmstrip'];
const features = ['none', 'style1', 'style2', 'style3', 'style4'];

export default function CameraBoothFinal() {
  const webcamRef = useRef(null);
  const captureRef = useRef(null);
  const [filter, setFilter] = useState('none');
  const [frame, setFrame] = useState('none');
  const [captured, setCaptured] = useState(null);
  const [featureText, setFeatureText] = useState('none');
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const videoEl = webcamRef.current?.video;
    if (videoEl) {
      videoEl.style.filter = getFilterCSS(filter);
    }
  }, [filter]);

  const getFilterCSS = (name) => {
    switch (name) {
      case 'sepia': return 'sepia(0.7)';
      case 'cool': return 'hue-rotate(180deg)';
      case 'pink': return 'hue-rotate(300deg) brightness(1.1)';
      case 'vibrant': return 'contrast(1.3) saturate(1.5)';
      case 'grayscale': return 'grayscale(1)';
      case 'funky': return 'invert(1) hue-rotate(270deg)';
      case 'dreamy': return 'blur(2px) brightness(1.2)';
      default: return 'none';
    }
  };

  const capture = async () => {
    const canvas = await html2canvas(captureRef.current);
    const dataUrl = canvas.toDataURL('image/png');
    setCaptured(dataUrl);
  };

  return (
    <div className="booth-wrapper">
      <h2 className="booth-title">📸 Birthday Camera Booth</h2>

      {!captured ? (
        <>
          <div
            id="styled-camera"
            className={`camera-area frame-${frame}`}
            ref={captureRef}
          >
            <Webcam
              ref={webcamRef}
              width={400}
              height={300}
              screenshotFormat="image/jpeg"
              style={{ filter: getFilterCSS(filter), borderRadius: '12px' }}
            />
            {featureText !== 'none' && (
              <div className={`feature-text ${featureText}`}>It’s Bhargavi’s Day 💖</div>
            )}
          </div>

          <div className="controls">
            <div className="section">
              <h3>🎨 Filters</h3>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>

            <div className="section">
              <h3>🖼️ Frames</h3>
              {frames.map(f => (
                <button key={f} onClick={() => setFrame(f)}>{f}</button>
              ))}
            </div>

            <div className="section">
              <h3>✨ Feature</h3>
              {features.map(f => (
                <button key={f} onClick={() => setFeatureText(f)}>{f === 'none' ? 'Normal' : `Style ${f.slice(-1)}`}</button>
              ))}
            </div>

            <button className="capture-btn" onClick={capture}>📸 Capture</button>
          </div>

          {featured.length > 0 && (
            <div className="featured-section">
              <h3>📸 Recently took photos</h3>
              <div className="photo-grid">
                {featured.map((img, idx) => (
                  <img key={idx} src={img} alt={`Featured ${idx}`} className="featured-photo" />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="capture-output">
          <img src={captured} alt="Captured" />
          <div className="actions">
            <a href={captured} download="birthday-frame.png">
              <button>💾 Download</button>
            </a>
            <button onClick={() => {
              setFeatured(prev => [...prev, captured]);
              setCaptured(null);
            }}>🌟 Feature on this site</button>
            <button onClick={() => setCaptured(null)}>🔁 Retake</button>
          </div>
        </div>
      )}
    </div>
  );
}