import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: [],
  singleVendor: [],
};

export const fetchVendors = createAsyncThunk(
  "vendors/fetchVendors",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data;
  }
);
export const fetchSingleVendor = createAsyncThunk(
  "vendors/fetchSingleVendor",
  async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    return data;
  }
);

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVendors.fulfilled, (state, action) => {
      state.vendors = action.payload;
    });
    builder.addCase(fetchSingleVendor.fulfilled, (state, action) => {
      state.singleVendor = action.payload;
    });
  },
});

export const {} = vendorsSlice.actions;
export const getAllVendors = (state) => state.vendors.vendors;
export const getSingleVendor = (state) => state.vendors.singleVendor;
export default vendorsSlice.reducer;
