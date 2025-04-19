import React, { useState } from 'react';
import './DumselodsGame.css';

const movieDataset = [
  "Baahubali", "Pushpa", "RRR", "Ala Vaikunthapurramuloo", "Sarkaru Vaari Paata",
  "Arjun Reddy", "Geetha Govindam", "DJ Tillu", "Bheemla Nayak", "Jathi Ratnalu",
  "Eega", "Magadheera", "Pokiri", "Gabbar Singh", "Athadu", "Manam", "Oopiri",
  "Ye Maaya Chesave", "Pelli Choopulu", "Karthikeya", "Happy Days", "Leader",
  "Race Gurram", "Janatha Garage", "Sye", "Temper", "Mirchi", "Nenokkadine",
  "Nannaku Prematho", "Fidaa", "Majili", "Goodachari", "Akhanda", "Radhe Shyam",
  "Krack", "Vakeel Saab", "Love Story", "Shyam Singha Roy", "Maharshi", "Uppena",
  "Dhruva", "Sarileru Neekevvaru", "Ismart Shankar", "Chitralahari", "Brochevarevarura",
  "Middle Class Melodies", "Colour Photo", "Hit", "Venky Mama", "Khaidi", "Jersey",
  "Bheeshma", "Dear Comrade", "Agent Sai Srinivasa Athreya", "Tholi Prema",
  "Swamy Ra Ra", "Anand", "Gamyam", "Vedam", "Gangleader", "Rangasthalam",
  "Mahanati", "Gudumba Shankar", "Indra", "Simhadri", "Tagore", "Sankarabharanam",
  "Sagara Sangamam", "Aditya 369", "Hello Brother", "Murari", "Nuvvu Naaku Nachav",
  "Chennakesava Reddy", "Aadi", "Arya", "Arya 2", "Bunny", "Desamuduru", "Sarrainodu",
  "Na Peru Surya", "Jai Lava Kusa", "Rarandoi Veduka Chudham", "Ninne Pelladata",
  "Premikudu", "Rakhi", "Gautamiputra Satakarni", "Narasimha Naidu",
  "Samarasimha Reddy", "Businessman", "SVSC", "Thammudu", "Kushi", "Balupu", "Don",
  "Atharintiki Daredi"
];

export default function DumselodsGame() {
  const [teamA, setTeamA] = useState({ name: 'Team A', score: 0 });
  const [teamB, setTeamB] = useState({ name: 'Team B', score: 0 });
  const [currentTurn, setCurrentTurn] = useState('A');
  const [choices, setChoices] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playerNames, setPlayerNames] = useState({ A: '', B: '' });

  const pickMovies = () => {
    const shuffled = [...movieDataset].sort(() => 0.5 - Math.random());
    setChoices(shuffled.slice(0, 2));
    setSelectedMovie(null);
  };

  const handleSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleResult = (result) => {
    if (result === 'win') {
      currentTurn === 'A'
        ? setTeamA(prev => ({ ...prev, score: prev.score + 1 }))
        : setTeamB(prev => ({ ...prev, score: prev.score + 1 }));
    } else {
      currentTurn === 'A'
        ? setTeamB(prev => ({ ...prev, score: prev.score + 1 }))
        : setTeamA(prev => ({ ...prev, score: prev.score + 1 }));
    }

    setCurrentTurn(currentTurn === 'A' ? 'B' : 'A');
    setChoices([]);
    setSelectedMovie(null);
  };

  return (
    <div className="dumselods-container">
      <h2>🎬 Dumselods Movie Face-Off</h2>

      <div className="team-names">
        <input
          placeholder="Player A Name"
          value={playerNames.A}
          onChange={(e) => setPlayerNames({ ...playerNames, A: e.target.value })}
        />
        <input
          placeholder="Player B Name"
          value={playerNames.B}
          onChange={(e) => setPlayerNames({ ...playerNames, B: e.target.value })}
        />
      </div>

      <div className="scores">
        <p>{playerNames.A || "Team A"}: {teamA.score}</p>
        <p>{playerNames.B || "Team B"}: {teamB.score}</p>
      </div>

      <h3>🎯 It's {currentTurn === 'A' ? playerNames.A || 'Team A' : playerNames.B || 'Team B'}'s turn!</h3>
      <button onClick={pickMovies} className="pick-btn">🎲 Pick Movies</button>

      {choices.length > 0 && (
        <div className="movie-options">
          {choices.map((movie, idx) => (
            <button
              key={idx}
              className={`movie-choice ${selectedMovie === movie ? 'selected' : ''}`}
              onClick={() => handleSelect(movie)}
            >
              {movie}
            </button>
          ))}
        </div>
      )}

      {selectedMovie && (
        <div className="result-controls">
          <p>🎥 Selected: <strong>{selectedMovie}</strong></p>
          <button onClick={() => handleResult('win')} className="win-btn">✅ Won</button>
          <button onClick={() => handleResult('lose')} className="lose-btn">❌ Lost</button>
        </div>
      )}
    </div>
  );
}
