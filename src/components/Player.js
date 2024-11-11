import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import {
  faBackward,
  faForward,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

// Keep track of song
let songIndex = 0;

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

export default function Player() {
  // Song Titles
  const songs = [];
  const songOptions = [];

  const [songName, setSongName] = useState();
  const [songAudio, setSongAudio] = useState();
  const [songImage, setSongImage] = useState();
  const [flowIcon, setFlowIcon] = useState(faPlay);
  const [musicContainer, setMusicContainer] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const audioEl = useRef(null);
  const [bar, setBar] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [songPlayer, setSongPlayer] = useState(false);

  // CREATE A .ENV FILE AND INCLUDE YOUR JAMENDO CLIENT ID
  const client_id = process.env.REACT_APP_CLIENT_ID;

  // useEffect(() => {
  //   if (isPlaying) {
  //     audioEl.current.pause();
  //     setMusicContainer("");
  //     setFlowIcon(faPlay);
  //   } else if (!isPlaying) {
  //     audioEl.current.play();
  //     setMusicContainer("play");
  //     setFlowIcon(faPause);
  //   }
  // }, [isPlaying]);

  // const handleNextSong = () => {
  //   songIndex++;

  //   if (songIndex > songs.length - 1) {
  //     songIndex = 0;
  //   }

  //   setSongName(songs[0][songIndex].title);
  //   setSongAudio(songs[0][songIndex].audio);
  //   setSongImage(songs[0][songIndex].image);

  //   setIsPlaying(false);
  // };

  // const handlePrevSong = () => {
  //   songIndex--;

  //   if (songIndex < 0) {
  //     songIndex = songs.length - 1;
  //   }

  //   setSongName(songs[0][songIndex].title);
  //   setSongAudio(songs[0][songIndex].audio);
  //   setSongImage(songs[0][songIndex].image);

  //   setIsPlaying(false);
  // };

  // const handleControl = () => {
  //   if (flowIcon === faPlay) {
  //     setFlowIcon(faPause);
  //     setIsPlaying(false);
  //   } else {
  //     setFlowIcon(faPlay);
  //     setIsPlaying(true);
  //   }
  // };

  // const handleEnded = () => {
  //   handleNextSong();
  // };

  // const setProgress = (e) => {
  //   const width = this.clientWidth;
  //   const clickX = e.offsetX;
  //   const duration = audioEl.duration;

  //   audioEl.currentTime = (clickX / width) * duration;
  // };

  // const updateProgress = (e) => {
  //   const duration = e.target.duration;
  //   const currentTime = e.target.currentTime;

  //   const progressPercent = (currentTime / duration) * 100;
  //   setBar(progressPercent);
  // };

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
        // songs.push(
        //   res.data.results.map((item) => {
        //     return { title: item.name, audio: item.audio, image: item.image };
        //   })
        // );

        res.data.results.map((item) => {
          // return songs.push({title: item.name, audio: item.audio, image: item.image});
          return songOptions.push({ value: item.audio, label: item.audio });
        })
        

        // setSongName(songs[0][songIndex].title);
        // setSongAudio(songs[0][songIndex].audio);
        // setSongImage(songs[0][songIndex].image);

        setSongPlayer(true);

        console.log(songOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
      {songPlayer && <div>
          <h3>Songs go here</h3>
          <Select
            // defaultValue={selectedOption}
            // onChange={setSelectedOption}
            options={songOptions}
            isMulti
            placeholder="Choose your mood..."
            required
          />
        </div>}
      {/* <div className={`music-container ${musicContainer}`}>
        <div className="music-info">
          <h4 id="title">{songName}</h4>
          <div
            onClick={(e) => setProgress(e)}
            className="progress-container"
            id="progress-container"
          >
            <div className="progress" style={{ width: `${bar}%` }}></div>
          </div>
        </div>

        <audio
          onTimeUpdate={(e) => updateProgress(e)}
          onEnded={handleEnded}
          ref={audioEl}
          autoPlay
          src={songAudio}
        ></audio>
        <div className="img-container">
          <img src={songImage} alt="music-cover" id="cover" />
        </div>

        <div className="navigation">
          <button onClick={handlePrevSong} id="prev" className="action-btn">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button onClick={handleControl} className="action-btn action-btn-big">
            <FontAwesomeIcon icon={flowIcon} />
          </button>
          <button onClick={handleNextSong} className="action-btn">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div> */}
    </>
  );
}
