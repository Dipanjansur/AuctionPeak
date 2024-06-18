import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const InitialState = {
  loading: false,
  erros: null,
  Auctions: [],
  Auction: {}
}

export const fetchAuctions = createAsyncThunk("auctions/fetchAll", () => {
  return axios
    .get('http://localhost:9090/auction/')
    .then(response => response.data)
})

export const fetchAuction = createAsyncThunk("auction/fetch", (Id) => {
  return axios
    .get(`http://localhost:9090/auction?Id=${Id}`)
    .then(response => response.data)
})


const AuctionSlice = createSlice({
  name: "auctions",
  InitialState,
  extraReducers: builder => {
    builder.addCase(fetchAuctions.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAuctions.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
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
      state.data = action.payload
    })
    builder.addCase(fetchAuction.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
  }
})
export const AuctionSliceReducer = AuctionSlice.reducer;