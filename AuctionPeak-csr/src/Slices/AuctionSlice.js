import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Baseaxios from "../utils/axiosConstruct";

const initialState = {
  loading: false,
  erros: null,
  Auctions: [],
  Auction: null
}

export const fetchAuctions = createAsyncThunk("auctions/fetchAll", async () => {
  const response = await Baseaxios.get('auction');
  return response;
})

export const fetchAuction = createAsyncThunk("auction/fetch", async (Id) => {
  const response = await Baseaxios.get(`auction/${Id}`);
  return response;
})


const AuctionSlice = createSlice({
  name: "auctions",
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchAuctions.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAuctions.fulfilled, (state, action) => {
      state.loading = false
      state.Auctions = action.payload
    })
    builder.addCase(fetchAuctions.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
    builder.addCase(fetchAuction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAuction.fulfilled, (state, action) => {
      state.loading = false
      state.Auction = action.payload
    })
    builder.addCase(fetchAuction.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
  }
})
export const AuctionSliceReducer = AuctionSlice.reducer;