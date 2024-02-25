import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying, setTracks, setFilteredTracks } from "../redux/listSlice";
import { ReactComponent as Ellipse } from "../assets/ellipse.svg";
import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 600px;
  height: 120px;
  padding-top: 35px;
`;

const EllipseBlock = styled.div`
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 950px) {
    transform: translateX(-50%) scale(90%);
  }

  @media (max-width: 800px) {
    top: -150px;
    transform: translateX(-50%) scale(70%);
  }

  @media (max-width: 650px) {
    transform: translateX(-50%) scale(60%);
  }

  @media (max-width: 550px) {
    transform: translateX(-50%) scale(50%);
  }

  @media (max-width: 450px) {
    transform: translateX(-50%) scale(40%);
  }

  @media (max-width: 380px) {
    transform: translateX(-50%) scale(30%);
  }
`;

const InputField = styled.input`
  position: absolute;
  width: 300px;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  color: white;
  letter-spacing: 1.1px;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid white;
  z-index: 1;

  @media (max-width: 650px) {
    width: 200px;
    font-size: 16px;
  }

  @media (max-width: 400px) {
    width: 150px;
    font-size: 16px;
  }

  &::placeholder {
    color: white;
    letter-spacing: 1.1px;
  }

  &:active,
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid white;
  }
`;
const Input = () => {
  const { tracks, currentTrackId } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const playingTrack = tracks.find((track) => track.id === currentTrackId);

    const text = event.target.value;

    if (text) {
      const updatedTracks = tracks.filter((track) => {
        return (
          track.title.toLowerCase().includes(text.toLowerCase()) ||
          track.artist.toLowerCase().includes(text.toLowerCase())
        );
      });

      dispatch(setFilteredTracks(updatedTracks));
    } else {
      if (playingTrack) {
        dispatch(setIsPlaying(playingTrack.id));
      }

      dispatch(setFilteredTracks([]));
      dispatch(setTracks(tracks));
    }
  };

  return (
    <InputWrapper>
      <EllipseBlock>
        <Ellipse />
      </EllipseBlock>
      <InputField placeholder="Search track" onChange={handleChange} />
    </InputWrapper>
  );
};
export default Input;
