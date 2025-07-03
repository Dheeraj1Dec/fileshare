import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;          //jo bhi data aa rha hai vo paylaod me aa raha hai ham use initialValue walle 
    },                                           //signupData me me set kar rahe hai state.signupData ka use karke
    setLoading(state, value) {                //state is the top most object containing all the data of the application so as to make
      state.loading = value.payload;          //the data accessible through out the application
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;