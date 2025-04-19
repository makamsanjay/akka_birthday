import React, { useEffect, useRef, useState } from 'react';
import './Welcome.css';
import mainimage1 from './mainimage1.jpeg';
import mainimage2 from './mainimage2.png';
import mainimage3 from './mainimage3.jpeg';
import mainimage4 from './mainimage4.jpeg';
import mainimage5 from './mainimage5.jpeg';
import mainimage6 from './mainimage6.jpeg';
import mainimage7 from './mainimage7.jpg';
import mainimage8 from './mainimage8.jpg';
import mainimage9 from './mainimage9.jpg';
import mainimage10 from './mainimage10.jpeg';

const images = [
  mainimage2,
  mainimage1,
  mainimage3,
  mainimage4,
  mainimage5,
  mainimage6,
  mainimage7,
  mainimage8,
  mainimage9,
  mainimage10,
];

const fonts = [
  "'Dancing Script', cursive",
  "'Pacifico', cursive",
  "'Great Vibes', cursive",
  "'Poppins', sans-serif",
];

export default function Welcome() {
  const [index, setIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('./ha');
    audioRef.current.loop = true;

    const handleUserGesture = () => {
      audioRef.current.play().catch((err) => {
        console.log("Playback failed:", err);
      });
      window.removeEventListener('click', handleUserGesture);
    };

    // Autoplay fix: wait for user interaction
    window.addEventListener('click', handleUserGesture);

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFontIndex((prev) => (prev + 1) % fonts.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getClass = (i) => {
    const len = images.length;
    if (i === index) return 'center';
    if (i === (index + 1) % len) return 'right';
    if (i === (index + 2) % len) return 'far-right';
    if (i === (index - 1 + len) % len) return 'left';
    if (i === (index - 2 + len) % len) return 'far-left';
    return 'hidden';
  };

  return (
    <>
      <div className="birthday-banner" style={{ fontFamily: fonts[fontIndex] }}>
         Happy Birthday Bhargavi 🎉
      </div>
      <div className="welcome-slider">
        {images.map((img, i) => {
          const isCenter = getClass(i) === 'center';
          const borderClass = `border-style-${fontIndex % 4}`;
          return (
            <div key={i} className={`photo-box ${getClass(i)}`}>
              <img
                src={img}
                alt={`slide-${i}`}
                className={isCenter ? borderClass : ''}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
