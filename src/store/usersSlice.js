import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("product/fetchUser", async (id) => {
  const response = await axios.get(`http://localhost:9000/users/${id}`);
  return response.data;
});

export const usersSlice = createSlice({
  initialState: [],
  name: "usersSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const {} = usersSlice.actions;
export const getUserSingle = (state) => state.userSingle;
export default usersSlice.reducer;
