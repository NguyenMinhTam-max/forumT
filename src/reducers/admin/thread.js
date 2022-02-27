import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../apis/admin/product';
import { getResponseError } from '../../helpers';

const initialState = {
  productList: [],
  curPage: 1,
  numPage: 1,
  total: 1,
  loading: false,
  modifyLoading: false,
};
//IMPORTANT NOTE : parameter in reducer and parameter in handler, API need to have the same name
export const getListThreadByCategory = createAsyncThunk(
  'product/getListThreadByCategory',
  async ({category, page, limit}, { rejectWithValue }) => {
    try {
      return (await API.getListThreadByCategory({category, page, limit})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const getListPostByThread = createAsyncThunk(
  'product/getListPostByThread',
  async ({postThreadId, page, limit}, { rejectWithValue }) => {
    try {
      return (await API.getListPostByThread({postThreadId, page, limit})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
)

export const deleteAuctionProduct = createAsyncThunk(
  'product/deleteAuctionProductList',
  async (productId, { rejectWithValue }) => {
    try {
      return (await API.deleteAuctionProduct({productId})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);


export const updateStatus = createAsyncThunk(
  'thread/updateStatus',
  async ({threadStatus, threadId}, { rejectWithValue }) => {
    try {
      return (await API.deleteAuctionProduct({threadStatus, threadId})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

//the below function is used to add data to local store, uneccessary to use now
// const userProductSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getListThreadByCategory.pending]: (state) => {
//       state.loading = true;
//     },
//     [getListThreadByCategory.rejected]: (state) => {
//       state.loading = false;
//     },
//     [getListThreadByCategory.fulfilled]: (state, action) => {
//       state.loading = false
//       const { productList, curPage, numPage, total } = action.payload
//       state.curPage = curPage
//       state.numPage = numPage
//       state.total = total
//       state.productList = productList
//     },
//   },
// });

// export const userProductActions = userProductSlice.actions;
// export default userProductSlice;
