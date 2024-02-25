import { setIsPlaying, setCurrentTrackId } from "../redux/listSlice";

export const play = (id, audio, tracks, currentTrackId, dispatch) => {
  dispatch(setIsPlaying(id));

  const newTrack = tracks.find((track) => track.id === id);

  if (newTrack && currentTrackId !== id) {
    dispatch(setCurrentTrackId(id));

    audio.currentTime = 0;
    audio.src = newTrack.src;
    audio.play();

    return;
  }

  if (newTrack && newTrack.isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
};

export const playNext = (audio, tracks, currentTrackId, dispatch) => {
  const nextTrackIndex =
    tracks.findIndex((track) => track.id === currentTrackId) + 1;
  const nextTrack = tracks[nextTrackIndex];

  if (nextTrack) {
    dispatch(setCurrentTrackId(nextTrack.id));
    dispatch(setIsPlaying(nextTrack.id));
    audio.currentTime = 0;
    audio.src = nextTrack.src;
    audio.play();
  }
};
