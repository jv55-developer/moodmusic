import { useState } from "react";
import "./App.css";
import Player from "./components/Player";

const options = [
  { value: "rock", label: "rock" },
  { value: "metal", label: "metal" },
  { value: "hardcore", label: "hardcore" },
  { value: "alternativerock", label: "alternativerock" },
  { value: "electronic", label: "electronic" },
  { value: "punk", label: "punk" },
  { value: "hardcorepunk", label: "hardcorepunk" },
  { value: "folk", label: "folk" },
  { value: "newage", label: "newage" },
  { value: "classical", label: "classical" },
  { value: "pop", label: "pop" },
  { value: "choral", label: "choral" },
  { value: "gospel", label: "gospel" },
];

function App() {
  const [music, setMusic] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  // CREATE A .ENV FILE AND INCLUDE YOUR JAMENDO CLIENT ID
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const songs = [];

  return (
    <div className="App container">
      <h2>Mood Music</h2>
      <Player />
    </div>
  );
}

export default App;
