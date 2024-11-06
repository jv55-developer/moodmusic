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

import unstoppable from "../assets/music/Unstoppable.mp3";
import comeback from "../assets/music/Comeback.mp3";
import finishLine from "../assets/music/Finish Line.mp3";
import legend from "../assets/music/Legend.mp3";
import monster from "../assets/music/Monster.mp3";
import untravelled from "../assets/music/Untraveled Road.mp3";
import weAre from "../assets/music/We Are.mp3";
import danger from "../assets/music/What's Up Danger.mp3";
import superkick from "../assets/music/Superkick Party.mp3";

import unstoppableImg from "../assets/images/Unstoppable.jpg";
import comebackImg from "../assets/images/Comeback.jpg";
import finishLineImg from "../assets/images/Finish Line.jpg";
import legendImg from "../assets/images/Legend.jpg";
import monsterImg from "../assets/images/Monster.jpg";
import untravelledImg from "../assets/images/Untraveled Road.jpg";
import weAreImg from "../assets/images/We Are.jpg";
import dangerImg from "../assets/images/What's Up Danger.jpg";
import superkickImg from "../assets/images/Superkick Party.jpg";

// Song Titles
const songs = [
  { title: "Unstoppable", audio: unstoppable, image: unstoppableImg },
  { title: "Superkick Party", audio: superkick, image: superkickImg },
  { title: "Comeback", audio: comeback, image: comebackImg },
  { title: "Finish Line", audio: finishLine, image: finishLineImg },
  { title: "Legend", audio: legend, image: legendImg },
  { title: "Monster", audio: monster, image: monsterImg },
  { title: "Untraveled Road", audio: untravelled, image: untravelledImg },
  { title: "We Are", audio: weAre, image: weAreImg },
  { title: "What's Up Danger", audio: danger, image: dangerImg },
];

// Keep track of song
let songIndex = 0;

export default function Player() {
  const [songName, setSongName] = useState(songs[songIndex].title);
  const [songAudio, setSongAudio] = useState(songs[songIndex].audio);
  const [songImage, setSongImage] = useState(songs[songIndex].image);
  const [flowIcon, setFlowIcon] = useState(faPlay);
  const [musicContainer, setMusicContainer] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const audioEl = useRef(null);
  const [bar, setBar] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.pause();
      setMusicContainer("");
      setFlowIcon(faPlay);
    } else if (!isPlaying) {
      audioEl.current.play();
      setMusicContainer("play");
      setFlowIcon(faPause);
    }
  }, [isPlaying]);

  const handleNextSong = () => {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }

    setSongName(songs[songIndex].title);
    setSongAudio(songs[songIndex].audio);
    setSongImage(songs[songIndex].image);

    setIsPlaying(false);
  };

  const handlePrevSong = () => {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    setSongName(songs[songIndex].title);
    setSongAudio(songs[songIndex].audio);
    setSongImage(songs[songIndex].image);

    setIsPlaying(false);
  };

  const handleControl = () => {
    if (flowIcon === faPlay) {
      setFlowIcon(faPause);
      setIsPlaying(false);
    } else {
      setFlowIcon(faPlay);
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    handleNextSong();
  };

  const setProgress = (e) => {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioEl.duration;

    audioEl.currentTime = (clickX / width) * duration;
  };

  const updateProgress = (e) => {
    const duration = e.target.duration;
    const currentTime = e.target.currentTime;

    const progressPercent = (currentTime / duration) * 100;
    setBar(progressPercent);
  };

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
      <div className={`music-container ${musicContainer}`}>
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
      </div>
    </>
  );
}
