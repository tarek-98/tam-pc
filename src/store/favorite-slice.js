import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let favorite = localStorage.getItem("favorite");
  if (favorite) {
    return JSON.parse(localStorage.getItem("favorite"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("favorite", JSON.stringify(data));
};

const initialState = {
  favorites: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      const isItemInFav = state.favorites.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInFav) {
        const tempFav = state.favorites.map((item) => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;

            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return item;
          }
        });

        state.favorites = tempFav;
        storeInLocalStorage(state.favorites);
      } else {
        state.favorites.push(action.payload);
        storeInLocalStorage(state.favorites);
      }
    },

    removeFromFav: (state, action) => {
      const tempFav = state.favorites.filter((item) => item.id !== action.payload);
      state.favorites = tempFav;
      storeInLocalStorage(state.favorites);
    },

    clearFav: (state) => {
      state.favorites = [];
      storeInLocalStorage(state.favorites);
    },
  },
});

export const {
  addToFav,
  clearFav,
  removeFromFav,
} = favSlice.actions;
export const getAllFavorites = (state) => state.favorite.favorites;
export const getCartItemsCount = (state) => state.favorite.itemsCount;

export default favSlice.reducer;
