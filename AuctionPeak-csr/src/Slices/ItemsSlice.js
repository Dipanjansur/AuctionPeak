import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Baseaxios from "../utils/axiosConstruct";

const InitialState = {
  loading: false,
  erros: null,
  Items: [],
  Item: {}
}

export const fetchItems = createAsyncThunk("items/fetchAll", async () => {
  const response = await Baseaxios.get('items');
  return response;

})

export const fetchItem = createAsyncThunk("items/fetch", async (Id) => {
  const response = await Baseaxios.get(`items/${Id}`);
  return response;

})


const ItemSlice = createSlice({
  name: "auctions",
  initialState: InitialState,
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false
      state.Items = action.payload
    })
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
    builder.addCase(fetchItem.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.loading = false
      state.Item = action.payload
    })
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
  }
})
export const ItemSliceReducer = ItemSlice.reducer;