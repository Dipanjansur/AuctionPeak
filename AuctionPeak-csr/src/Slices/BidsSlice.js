import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Baseaxios from "../utils/axiosConstruct";

const InitialState = {
  loading: false,
  erros: null,
  Bids: [],
  Bid: {}
}

export const fetchBids = createAsyncThunk("Bids/fetchAll", async () => {
  const response = await Baseaxios.get('bids');
  return response;
})

export const fetchBid = createAsyncThunk("Bid/fetch", async (Id) => {
  const response = await Baseaxios.get(`bids/{Id}`);
  return response;

})


const BidsSlice = createSlice({
  name: "auctions",
  initialState: InitialState,
  extraReducers: builder => {
    builder.addCase(fetchBids.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchBids.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchBids.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
    builder.addCase(fetchBid.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchBid.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchBid.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
  }
})
export const BidsSliceReducer = BidsSlice.reducer;