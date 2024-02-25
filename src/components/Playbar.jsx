import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrackId, setIsPlaying } from "../redux/listSlice";
import TimeControl from "./TimeControl";
import { audio } from "./List";
import { trackList } from "../assets/trackList";
import formateTime from "../utils/formateTime";
import { play, playNext } from "../utils/playUtils";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, FastRewind, FastForward } from "@mui/icons-material";
import { styled } from "styled-components";

const StyledPlaybar = styled.div`
  position: fixed;
  background-color: var(--color-green);
  width: 100%;
  min-height: 70px;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  padding: 0 30px;

  @media (max-width: 1100px) {
    padding: 0 15px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 10px;
    padding: 10px 20px;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const PlaybarLeft = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  gap: 25px;

  @media (max-width: 1100px) {
    gap: 15px;
  }

  @media (max-width: 700px) {
    width: 100%;
    gap: 25px;
  }

  @media (max-width: 550px) {
    gap: 15px;
  }
`;

const PlaybarRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  gap: 25px;

  @media (max-width: 1100px) {
    gap: 10px;
  }

  @media (max-width: 700px) {
    justify-content: center;
    width: 100%;
    gap: 0;
  }
`;

const Playbaricture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;

  @media (max-width: 850px) {
    width: 40px;
    height: 40px;
  }
`;

const StyledIconButton = styled(IconButton)`
  @media (max-width: 400px) {
    width: 30px;
    height: 30px;
  }
`;

const PlaybarInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  font-weight: bold;

  @media (max-width: 400px) {
    font-size: 14px;
    font-weight: bold;
  }

  @media (max-width: 350px) {
    font-size: 13px;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 20px;

  @media (max-width: 900px) {
    gap: 10px;
    margin-left: 10px;
  }

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
const defaultTrack = trackList[0];

const Playbar = () => {
  const { tracks, currentTrackId } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const currentTrack = tracks.find((item) => item.id === currentTrackId);

  useEffect(() => {
    audio.addEventListener("ended", handleNextTrack);

    return () => {
      audio.removeEventListener("ended", handleNextTrack);
    };
  }, [currentTrackId]);

  const handlePreviousTrack = () => {
    const previousTrackIndex =
      tracks.findIndex((track) => track.id === currentTrackId) - 1;
    const previousTrack = tracks[previousTrackIndex];

    if (previousTrack) {
      dispatch(setCurrentTrackId(previousTrack.id));
      dispatch(setIsPlaying(previousTrack.id));
      audio.currentTime = 0;
      audio.src = previousTrack.src;
      audio.play();
    }
  };

  const handlePlay = (id) => {
    play(id, audio, tracks, currentTrackId, dispatch);
  };

  const handleNextTrack = () => {
    playNext(audio, tracks, currentTrackId, dispatch);
  };

  return (
    <StyledPlaybar>
      <PlaybarLeft>
        <Playbaricture
          src={currentTrack ? currentTrack.preview : defaultTrack.preview}
          alt=""
        />
        <StyledIconButton
          onClick={() =>
            handlePlay(currentTrackId ? currentTrackId : defaultTrack.id)
          }
        >
          {currentTrack && currentTrack.isPlaying ? <Pause /> : <PlayArrow />}
        </StyledIconButton>
        <PlaybarInfo>
          <p>{currentTrack ? currentTrack.title : defaultTrack.title}</p>
          <p>{currentTrack ? currentTrack.artist : defaultTrack.artist}</p>
        </PlaybarInfo>
        <StyledIconButton onClick={handlePreviousTrack}>
          <FastRewind />
        </StyledIconButton>
        <StyledIconButton onClick={handleNextTrack}>
          <FastForward />
        </StyledIconButton>
      </PlaybarLeft>
      <PlaybarRight>
        <SliderWrapper>
          <TimeControl />
          <p>
            {currentTrack
              ? formateTime(currentTrack.duration)
              : formateTime(defaultTrack.duration)}
          </p>
        </SliderWrapper>
      </PlaybarRight>
    </StyledPlaybar>
  );
};
export default Playbar;
