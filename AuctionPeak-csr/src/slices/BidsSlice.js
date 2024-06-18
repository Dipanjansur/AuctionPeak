import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const InitialState = {
  loading: false,
  erros: null,
  Bids: [],
  Bid: {}
}

export const fetchBids = createAsyncThunk("Bids/fetchAll", () => {
  return axios
    .get('http://localhost:9090/bids/')
    .then(response => response.data)
})

export const fetchBid = createAsyncThunk("Bid/fetch", (Id) => {
  return axios
    .get(`http://localhost:9090/bids?Id=${Id}`)
    .then(response => response.data)
})


const BidsSlice = createSlice({
  name: "auctions",
  InitialState,
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