import { useState } from "react";
import "./App.css";
import Select from "react-select";
import axios from "axios";

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
  const [selectedOption, setSelectedOption] = useState(null);
  const [music, setMusic] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const songs = [];

  const makeRequest = (e) => {
    e.preventDefault();

    axios
      .get("https://api.jamendo.com/v3.0/tracks", {
        params: {
          client_id: client_id,
          format: "json",
          limit: 5,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App container">
      <div className="row">
        <div className="col-4">
          <h2>Mood Music</h2>
          <form onSubmit={makeRequest} className="row g-3">
            <div className="col-auto">
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
                placeholder="Choose your mood..."
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
          {showPlayer && (
            <audio controls>
              <source
                src="https://prod-1.storage.jamendo.com/?trackid=168&format=mp31&from=aadQ%2FcXbwHety91GwXg%2BMw%3D%3D%7C4vC%2B9FTXDXVtQNWoqmbwog%3D%3D"
                type="audio/mp3"
              />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
