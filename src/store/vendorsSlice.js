import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://tager.onrender.com";

const initialState = {
  vendors: [],
  singleVendor: [],
  followers: [],
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

//follow vendor
export const followVendor = createAsyncThunk(
  "vendors/followVendor",
  async ({ VendorId, UserId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/client/follow-vendor/${VendorId}/${UserId}`
      );
      console.log(response.data);
      console.log(UserId, VendorId);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      console.log(UserId, VendorId);
      return rejectWithValue(error.response.data);
    }
  }
);

export const unFollowVendor = createAsyncThunk(
  "vendors/unFollowVendor",
  async ({ VendorId, UserId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/client/unfollow-vendor/${VendorId}/${UserId}`
      );
      console.log(response.data);
      console.log(UserId, VendorId);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      console.log(UserId, VendorId);
      return rejectWithValue(error.response.data);
    }
  }
);

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  status: "idle",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.vendors = action.payload;
        state.status = "succeded";
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchSingleVendor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSingleVendor.fulfilled, (state, action) => {
        state.singleVendor = action.payload;
        state.status = "succeded";
      })
      .addCase(fetchSingleVendor.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(followVendor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(followVendor.fulfilled, (state, action) => {
        state.status = "succeded";
        state.followers = action.payload;
      })
      .addCase(followVendor.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(unFollowVendor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(unFollowVendor.fulfilled, (state, action) => {
        state.status = "succeded";
        state.followers = action.payload;
      })
      .addCase(unFollowVendor.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = vendorsSlice.actions;
export const getAllVendors = (state) => state.vendors.vendors;
export const getSingleVendor = (state) => state.vendors.singleVendor;
export default vendorsSlice.reducer;
