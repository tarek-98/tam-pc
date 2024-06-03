import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "../components/comments/commentService";

// Async thunk for fetching comments from the API
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (id) => {
    const response = await commentService.getComments(id);
    return response.data;
  }
);
export const fetchReplies = createAsyncThunk(
  "comments/fetchReplies",
  async (commentId) => {
    const response = await commentService.getReplies(commentId);
    return { commentId, replies: response.data };
  }
);
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Reducer functions for adding and removing comments (synchronous)
    addComment(state, action) {
      state.comments.push(action.payload);
    },
    removeComment(state, action) {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    addReply(state, action) {
      const { commentId, reply } = action.payload;
      const comment = state.comments.find(
        (comment) => comment.id === commentId
      );
      if (comment) {
        comment.replies.push(reply);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchReplies.fulfilled, (state, action) => {
        const { commentId, replies } = action.payload;
        const comment = state.comments.find(
          (comment) => comment.id === commentId
        );
        if (comment) {
          comment.replies = replies;
        }
      });
  },
});

export const { addComment, removeComment, addReply } = commentsSlice.actions;
export const getAllComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
