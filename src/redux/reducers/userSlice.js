import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    customers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    }
  }
})

export const { setUser, setCustomers } = userSlice.actions;

export default userSlice.reducer;