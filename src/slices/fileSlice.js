import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    files: JSON.parse(localStorage.getItem("userFiles")) || [],
    loading: false,
    fetched: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
      state.fetched = true;
      localStorage.setItem("userFiles", JSON.stringify(state.files));
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
      localStorage.setItem("userFiles", JSON.stringify(state.files));
    },
  },
});

export const { setLoading, setFiles, addFile } = fileSlice.actions;
export default fileSlice.reducer;

