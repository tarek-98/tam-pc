import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("chat/fetchUsers", async () => {
  const response = await axios.get("http://localhost:9000/usersChat");
  return response.data;
});

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async () => {
    const response = await axios.get("http://localhost:9000/messages");
    return response.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { addUser, receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;
