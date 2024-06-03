import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchVendors = createAsyncThunk(
  "userSlice/fetchUser",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data;
  }
);

export const vendorsSlice = createSlice({
  initialState: [],
  name: "vendorsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVendors.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const {} = vendorsSlice.actions;
export const getUserSingle = (state) => state.userSingle;
export default vendorsSlice.reducer;
