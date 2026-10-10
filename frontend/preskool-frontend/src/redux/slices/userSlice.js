import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    addLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    addError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addUser, addLoading, addError } = userSlice.actions;

export default userSlice.reducer;
