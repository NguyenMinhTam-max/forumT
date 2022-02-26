import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../apis/category';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],// initial attribute of object
  loading: false,
};

export const getListCategory = createAsyncThunk(
  'category/Get',
  async ({page, limit}, { rejectWithValue }) => {
  try {
    const categories = (await categoryApi.getListCategory({page, limit})).data
    return categories;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const adminCategorySlice = createSlice({
  name: 'category',// name of data in store, call by thread page with variable const categories = useSelector((state) => state.category.dataResult);
  initialState,
  reducers: {},
  extraReducers: {
    [getListCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getListCategory.fulfilled]: (state, action) => {
      state.loading = false;
      const {paginationResult} = action.payload;
      state.dataResult = paginationResult // dataResult is custom attribute using to store data of pagination result
    },
  },
});

export const adminCategoryActions = adminCategorySlice.actions;
export default adminCategorySlice;