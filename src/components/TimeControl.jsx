import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTime } from "../redux/playbarSlice";
import { defaultTrack, audio } from "./List";
import { Slider } from "@mui/material";
import formateTime from "../utils/formateTime";
import styled from "styled-components";

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 300px;

  & .MuiSlider-root.MuiSlider-colorPrimary {
    color: var(--color-bg) !important;
  }

  @media (max-width: 1050px) {
    width: 200px;
    gap: 20px;
  }

  @media (max-width: 700px) {
    width: 300px;
  }

  @media (max-width: 500px) {
    width: 200px;
  }
`;

const TimeControl = () => {
  const { tracks, currentTrackId } = useSelector((state) => state.list);
  const currentTime = useSelector((state) => state.playbar.currentTime);

  const dispatch = useDispatch();

  const currentTrack = tracks.find((item) => item.id === currentTrackId);

  const sliderProgress = currentTrack
    ? Math.round((currentTime / currentTrack.duration) * 100)
    : Math.round((currentTime / defaultTrack.duration) * 100);

  const handleChangeTime = (event, value, activeThumb) => {
    if (currentTrack && typeof value === "number") {
      const time = Math.round((value / 100) * currentTrack?.duration);
      dispatch(setCurrentTime(time));
      audio.currentTime = time;
    }
  };
  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(setCurrentTime(audio.currentTime));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <SliderContainer>
      <p>{formateTime(currentTime)}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderProgress}
        onChange={handleChangeTime}
      />
    </SliderContainer>
  );
};
export default TimeControl;
