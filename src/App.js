import React, { useState, useEffect } from 'react';
import Countdown from './components/IntroTimer.js';
import Welcome from './components/Welcome.js';
import PhotoGallery from './components/PhotoGallery';
import LetterQuiz from './components/LetterQuiz';
import SpinWheel from './components/Games/SpinWheel';
import MemoryGame from './components/Games/MemoryGame';
import ThankYou from './components/ThankYou';
import CameraBoothFinal from './components/CameraBoothFinal';
import VideoGate from './components/VideoGate';
import './App.css';
//import MemoryRunGame from './components/Games/MemoryRun.js';
import BalloonPopGame from './components/Games/BalloonPopGame.js';
import GiftReveal from './components/GiftReveal';
import DumselodsGame from './components/DumselodsGame.js';
import DumpPhotos from './components/DumpPhoto.js';
import TruthOrDare from './components/TruthorDare.js';

function App() {
  const [showWelcome, setShowWelcome] = useState(false);

  const handleCountdownComplete = () => {
    setShowWelcome(true);
  };

  return (
    <div className="App">
      {!showWelcome ? (
        <Countdown onComplete={handleCountdownComplete} />
      ) : (
        <>
          <Welcome />
          <LetterQuiz />
          <VideoGate />
          <PhotoGallery />
          <CameraBoothFinal />
          <BalloonPopGame />
          <MemoryGame />
          <SpinWheel />
          <GiftReveal/>
          <DumpPhotos/>
          <TruthOrDare/>
          <DumselodsGame/>
          <ThankYou />
        </>
      )}
    </div>
  );
}

export default App;
