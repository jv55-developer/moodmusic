import { useState } from "react";
import "./App.css";
import Player from "./components/Player";

function App() {
  const [music, setMusic] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="App container">
      <h2>Mood Music</h2>
      <Player />
    </div>
  );
}

export default App;
