import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://tager.onrender.com";

export const fetchUsers = createAsyncThunk("product/fetchUser", async (id) => {
  const response = await axios.get(`http://localhost:9000/users/${id}`);
  return response.data;
});

export const editUser = createAsyncThunk(
  "product/editUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/client/edit-profile/${id}`,
        userData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const usersSlice = createSlice({
  initialState: [],
  name: "usersSlice",
  user: [],
  status: "idle",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(editUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = "succeded";
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const {} = usersSlice.actions;
export const getUserSingle = (state) => state.userSingle;
export default usersSlice.reducer;
