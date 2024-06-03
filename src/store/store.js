import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import favSlice from "./favorite-slice";
import otpSlice from "./otpSlice";
import vendorsSlice from "./vendorsSlice";
import commentsSlice from "./commentSlice";
import usersSlice from "./usersSlice";
import AddressSlice from "./AddressSlice";
import authReducer from "./authSlice";
import { loadState, saveState } from "../utils/localStorage";
import locationReducer from "./locationSlice";
import cartSlice from "./cartSlice";
import shippingReducer from "./shippingSlice";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    address: AddressSlice,
    category: categoryReducer,
    product: productReducer,
    cart: cartSlice,
    search: searchReducer,
    favorite: favSlice,
    vendors: vendorsSlice,
    users: usersSlice,
    otp: otpSlice,
    comments: commentsSlice,
    auth: authReducer,
    location: locationReducer,
    shipping: shippingReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export default store;
