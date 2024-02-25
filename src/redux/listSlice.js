import { createSlice } from "@reduxjs/toolkit";
import { trackList } from "../assets/trackList";

const initialState = {
  tracks: trackList,
  currentTrackId: 0,
  filteredTracks: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.tracks = state.tracks.map((item) =>
        item.id === action.payload
          ? { ...item, isPlaying: !item.isPlaying }
          : { ...item, isPlaying: false }
      );
      state.filteredTracks = state.filteredTracks.map((item) =>
        item.id === action.payload
          ? { ...item, isPlaying: !item.isPlaying }
          : { ...item, isPlaying: false }
      );
    },
    setCurrentTrackId: (state, action) => {
      state.currentTrackId = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setFilteredTracks: (state, action) => {
      state.filteredTracks = action.payload;
    },
  },
});

export const { setIsPlaying, setCurrentTrackId, setTracks, setFilteredTracks } =
  listSlice.actions;
export default listSlice.reducer;
