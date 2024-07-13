import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";

// Thunks for sending OTP and verifying OTP
export const sendOTP = createAsyncThunk("auth/sendOTP", async (phoneNumber) => {
  const response = await fetch(`${API_URL}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });
  return response.json();
});

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ phoneNumber, otp }) => {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    return response.json();
  }
);

// Async thunk for user login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, pass }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/client/login/${email}/${pass}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/new-vendor-request`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for user login
export const logOut = createAsyncThunk(
  "auth/logOut",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/client/logout`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    phoneNumber: "",
    otp: "",
    status: "idle",
    error: null,
    isNewUser: false,
    userInfo: null,
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isNewUser = action.payload.isNewUser;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPhoneNumber, setOtp } = authSlice.actions;

export default authSlice.reducer;
