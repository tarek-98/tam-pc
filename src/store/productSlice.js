import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const API_URL = "http://tager.onrender.com";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
  newestProducts: [],
  newestProductsStatus: STATUS.IDLE,
  productsByVendor: [],
  productsByVendorStatus: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.productsStatus = "loading";
      })

      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
      })

      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncNewestProducts.pending, (state, action) => {
        state.newestProductsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncNewestProducts.fulfilled, (state, action) => {
        state.newestProducts = action.payload;
        state.newestProductsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncNewestProducts.rejected, (state, action) => {
        state.newestProductsStatus = STATUS.FAILED;
      })

      .addCase(fetchProductByVendor.pending, (state, action) => {
        state.productsByVendorStatus = STATUS.LOADING;
      })

      .addCase(fetchProductByVendor.fulfilled, (state, action) => {
        state.productsByVendor = action.payload;
        state.productsByVendorStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchProductByVendor.rejected, (state, action) => {
        state.productsByVendorStatus = STATUS.FAILED;
      });
  },
});

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const response = await fetch(
      // "https://gomla-wbs.el-programmer.com/api/products/latest"
      `${API_URL}/products/getall`
    );
    const data = await response.json();
    return data.products;
  }
);
export const fetchAsyncNewestProducts = createAsyncThunk(
  "newestProducts/fetch",
  async () => {
    const response = await fetch(
      "https://gomla-wbs.el-programmer.com/api/products/latest"
    );
    const data = await response.json();
    return data.products;
  }
);

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    // const response = await fetch(`${API_URL}/products/product/${id}`);
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  }
);
// getting the single product data also
export const fetchProductByVendor = createAsyncThunk(
  "fetchProductByVendor/fetch",
  async (vendorId) => {
    const response = await fetch(`${API_URL}/products/products/${vendorId}`);
    const data = await response.json();
    return data;
  }
);

export const getAllProducts = (state) => state.product.products;
export const getAllNewestProducts = (state) => state.product.newestProducts;
export const getProductsByVendor = (state) => state.product.productsByVendor;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) =>
  state.product.productSingleStatus;
export default productSlice.reducer;
