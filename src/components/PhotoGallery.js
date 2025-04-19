import React from 'react';
import './PhotoGallery.css';
import testImg from './photoGallery1.jpg';
import image2 from './photoGallery2.jpg'
import image3 from './photoGallery3.jpg'
import image4 from './photogallery4.jpg'

export default function PhotoGallery() {
  const photos = [testImg, image2, image3, image4];

  return (
    <div className="w-thread-gallery">
      <h2 className="gallery-title">📸 Sweet Moments</h2>
      <div className="thread-rope">
        <div className="thread-drop drop1" />
        <div className="thread-drop drop2" />
        <div className="thread-drop drop3" />
        <div className="thread-drop drop4" />
      </div>

      <div className="polaroid-wall">
        {photos.map((img, i) => (
          <div
            className={`polaroid-single ${i === 0 ? 'tilt-left' : i === 2 ? 'tilt-right' : ''}`}
            key={i}
          >
            <div className="pin" />
            <img src={img} alt={`memory-${i}`} />
            <div className="caption">Memory {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
