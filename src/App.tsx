import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

const PROGRESS_BAR_SIZE = 400;

const useStyles = makeStyles((theme) => ({
  player: {
    border: "15px solid magenta",
    height: 600,
    width: "90%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  videoViewer: {
    border: "5px solid green",
    height: "50%",
    width: "100%",
  },
  playerControls: {
    border: "4px solid blue",
    marginTop: 15,
    height: 30,
    width: "100%",
    display: "flex",
  },
  btnPlay: {
    width: 50,
    marginRight: 15,
  },
  progressBarContainer: {
    border: "1px solid magenta",
    width: PROGRESS_BAR_SIZE,
    backgroundColor: "grey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  progressBar: {
    height: 8,
    position: "absolute",
    border: "2px solid red",
  },

  circle: {
    position: "absolute",
    right: -16,
    top: -6,
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "black",
  },
}));

export default function App() {
  const classes = useStyles();
  const videoRef = useRef<any>(null);
  const inputProgressBarRef = useRef<HTMLInputElement>(null);

  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isVolumeOn, setIsVolumeOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeVideoRange, setTimeVideoRange] = useState(0);

  const handlePlay = () => {
    videoRef?.current?.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    videoRef?.current?.pause();
    setIsPlaying(false);
  };

  const handleVolumeOff = () => setIsVolumeOn(false);
  const handleVolumeOn = () => setIsVolumeOn(true);

  const handleInputProgressBar = (e: any) => {
    console.log(e.target.value);
    if (videoRef?.current) {
      (videoRef?.current).currentTime =
        (videoRef?.current).duration * e.target.value;
    }
    setTimeVideoRange(e.target.value);
  };

  videoRef?.current?.addEventListener("timeupdate", () => {
    const { duration, currentTime } = videoRef.current;
    const percent = currentTime / duration;
    if (inputProgressBarRef?.current!) {
      setTimeVideoRange(percent);
    }
  });

  return (
    <div className={classes.player}>
      <video
        className={classes.videoViewer}
        ref={videoRef}
        muted={isVolumeOn ? false : true}
        controls={true}
      >
        <source
          src={
            "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/720p.mp4"
          }
          type="video/mp4"
        />
      </video>

      <div className={classes.playerControls}>
        {!isPlaying ? (
          <button className={classes.btnPlay} onClick={handlePlay}>
            Play
          </button>
        ) : (
          <button className={classes.btnPlay} onClick={handleStop}>
            Stop
          </button>
        )}

        {/* <div
          style={{
            border: "2px solid green",
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <span ref={actualTime}>0:00</span>/<span>{videoDuration}</span>
        </div> */}

        {!isVolumeOn ? (
          <button
            onClick={() => {
              handleVolumeOn();
            }}
          >
            Volume on
          </button>
        ) : (
          <button
            onClick={() => {
              handleVolumeOff();
            }}
          >
            Volume off
          </button>
        )}
      </div>

      <input
        type="range"
        ref={inputProgressBarRef}
        min="0"
        max="1"
        step="0.01"
        value={timeVideoRange}
        onChange={(e) => {
          handleInputProgressBar(e);
        }}
      />
    </div>
  );
}
