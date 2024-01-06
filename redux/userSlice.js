import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userid: "",
  phoneno: "",
  accessToken: "",
  refreshToken: "",
  username: "",
};

export const Userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userid = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPhoneNo: (state, action) => {
      state.phoneno = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const {
  setUser,
  setUsername,
  setPhoneNo,
  setAccessToken,
  setRefreshToken,
} = Userslice.actions;

export default Userslice.reducer;
