import React, { useState } from 'react';
import './DumpPhoto.css';

// Image Imports
import dump1 from '../assets/dump/dump1.jpeg';
import dump2 from '../assets/dump/dump2.jpeg';
import dump3 from '../assets/dump/dump3.jpeg';
import dump4 from '../assets/dump/dump4.jpeg';
import dump5 from '../assets/dump/dump5.jpeg';
import dump6 from '../assets/dump/dump6.jpeg';
import dump7 from '../assets/dump/dump7.jpeg';
import dump8 from '../assets/dump/dump8.jpg';
import dump9 from '../assets/dump/dump9.jpg';
import dump10 from '../assets/dump/dump10.jpg';
import dump11 from '../assets/dump/dump11.jpg';
import dump12 from '../assets/dump/dump12.jpg';
import dump13 from '../assets/dump/dump13.jpg';
import dump14 from '../assets/dump/dump14.jpeg';
import dump15 from '../assets/dump/dump15.jpeg';
import dump33 from '../assets/dump/dump33.jpeg';
import dump34 from '../assets/dump/dump34.jpeg';
import dump35 from '../assets/dump/dump35.jpeg';
import dump36 from '../assets/dump/dump36.jpeg';
import dump37 from '../assets/dump/dump37.jpeg';
import dump38 from '../assets/dump/dump38.jpeg';

// Video Imports
import dump16 from '../assets/dump/dump33.mp4';
import dump17 from '../assets/dump/dump34.mp4';
import dump18 from '../assets/dump/dump35.mp4';
import dump19 from '../assets/dump/dump19.mp4';
import dump20 from '../assets/dump/dump20.mp4';
import dump21 from '../assets/dump/dump21.mp4';
import dump22 from '../assets/dump/dump22.mp4';
import dump23 from '../assets/dump/dump18.mp4';
import dump25 from '../assets/dump/dump25.mp4';
import dump26 from '../assets/dump/dump26.mp4';
import dump29 from '../assets/dump/dump29.mp4';
import dump30 from '../assets/dump/dump30.mp4';
import dump31 from '../assets/dump/dump31.mp4';
import dump44 from '../assets/dump/dump44.mov';

const shuffledMedia = [
  { type: 'video', src: dump44 },
  { type: 'video', src: dump23 },
  { type: 'image', src: dump3 },
  { type: 'video', src: dump16 },
  { type: 'video', src: dump22 },
  { type: 'video', src: dump31 },
  { type: 'image', src: dump8 },
  { type: 'image', src: dump1 },
  { type: 'video', src: dump21 },
  { type: 'image', src: dump9 },
  { type: 'video', src: dump26 },
  { type: 'image', src: dump15 },
  { type: 'image', src: dump14 },
  { type: 'image', src: dump4 },
  { type: 'video', src: dump17 },
  { type: 'video', src: dump29 },
  { type: 'image', src: dump35 },
  { type: 'image', src: dump37 },
  { type: 'image', src: dump33 },
  { type: 'image', src: dump13 },
  { type: 'image', src: dump11 },
  { type: 'video', src: dump18 },
  { type: 'video', src: dump30 },
  { type: 'image', src: dump12 },
  { type: 'image', src: dump36 },
  { type: 'image', src: dump34 },
  { type: 'image', src: dump38 },
  { type: 'image', src: dump2 },
  { type: 'video', src: dump19 },
  { type: 'image', src: dump7 },
  { type: 'video', src: dump25 },
  { type: 'image', src: dump10 },
  { type: 'image', src: dump6 },
  { type: 'image', src: dump5 },
  { type: 'video', src: dump20 },
];

export default function DumpPhotos() {
  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <div className="dump-section">
      <h2 className="dump-title">📸 Memory Dump</h2>
      <div className="dump-grid">
        {shuffledMedia.slice(0, visibleCount).map((item, index) => (
          <div key={index} className="dump-item">
            {item.type === 'image' ? (
              <img src={item.src} alt={`Dump ${index}`} loading="lazy" />
            ) : (
              <video src={item.src} controls preload="none" />
            )}
          </div>
        ))}
      </div>
      {visibleCount < shuffledMedia.length && (
        <button className="see-more-btn" onClick={() => setVisibleCount(shuffledMedia.length)}>
          👀 See All
        </button>
      )}
    </div>
  );
}
