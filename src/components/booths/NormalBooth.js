import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';

export default function NormalBooth() {
  const webcamRef = useRef(null);
  const frameRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const capture = async () => {
    const canvas = await html2canvas(frameRef.current);
    setPhoto(canvas.toDataURL('image/png'));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {!photo ? (
        <>
          <div ref={frameRef} style={{ display: 'inline-block', border: '6px solid #81d4fa', borderRadius: 16 }}>
            <Webcam ref={webcamRef} width={400} height={300} screenshotFormat="image/jpeg" />
          </div>
          <br />
          <button onClick={capture}>📸 Capture</button>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" style={{ width: 400, borderRadius: 16 }} />
          <br />
          <a href={photo} download="birthday-photo.png"><button>💾 Download</button></a>
          <button onClick={() => setPhoto(null)}>🔁 Retake</button>
        </>
      )}
    </div>
  );
}
