import { useState } from "react";
import "./App.css";
import Player from "./components/Player";

function App() {
  const [childState, setChildState] = useState(true); // Parent state

  // Function to update the state in the parent component
  const handleChildStateChange = (newState) => {
    setChildState(newState);
  };

  return (
    <div className="App container">
      {childState && <h2>Mood Music</h2>}
      <Player onStateChange={handleChildStateChange} />
    </div>
  );
}

export default App;
