import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trackList } from "../assets/trackList";
import formateTime from "../utils/formateTime";
import { play, playNext } from "../utils/playUtils";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { styled } from "styled-components";

const TrackList = styled.div`
  max-width: 600px;
  min-height: calc(100vh - 70px);
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 5px 25px 5px rgba(185, 253, 80, 0.39);
  padding: 25px 15px 10px;
  margin: 0 auto;
  margin-bottom: 70px;
  background-color: var(--color-bg);
  z-index: 2;

  @media (max-width: 650px) {
    padding: 10px;
  }
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  background-color: var(--color-bg);

  color: white;
  letter-spacing: 1px;
  font-size: 15px;
  margin-bottom: 25px;
  z-index: 2;

  @media (max-width: 650px) {
    font-size: 14px;
    gap: 15px;
  }

  @media (max-width: 350px) {
    font-size: 13px;
    gap: 10px;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  font-weight: bold;

  @media (max-width: 400px) {
    font-weight: normal;
  }
`;

const StyledIconButton = styled(IconButton)`
  &.MuiButtonBase-root.MuiIconButton-root {
    background-color: var(--color-green);
  }

  @media (max-width: 400px) {
    width: 35px;
    height: 35px;
  }
`;

const Picture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
`;

export const defaultTrack = trackList[0];
export const audio = new Audio(defaultTrack.src);

const List = () => {
  const { tracks, filteredTracks, currentTrackId } = useSelector(
    (state) => state.list
  );
  const dispatch = useDispatch();

  const renderedTracks = filteredTracks.length === 0 ? tracks : filteredTracks;

  useEffect(() => {
    audio.addEventListener("ended", handleNextTrack);

    return () => {
      audio.removeEventListener("ended", handleNextTrack);
    };
  }, [currentTrackId, tracks]);

  const handlePlay = (id) => {
    play(id, audio, tracks, currentTrackId, dispatch);
  };

  const handleNextTrack = () => {
    playNext(audio, tracks, currentTrackId, dispatch);
  };

  return (
    <TrackList>
      {renderedTracks.map((track) => (
        <Track key={track.id}>
          <StyledIconButton onClick={() => handlePlay(track.id)}>
            {track.isPlaying ? <Pause /> : <PlayArrow />}
          </StyledIconButton>
          <Picture src={track.preview} alt="album-cover" />
          <TrackInfo>
            <p>{track.title}</p>
            <p>{track.artist}</p>
          </TrackInfo>
          <p>{formateTime(track.duration)}</p>
        </Track>
      ))}
    </TrackList>
  );
};
export default List;
