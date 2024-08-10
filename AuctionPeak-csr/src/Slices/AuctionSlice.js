import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  loading: false,
  erros: null,
  Auctions: [],
  Auction: {}
}
const AuthHeader = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ZTU3ZGZmOS01ZTk2LTRlZjYtYTFmMi01OWMxN2E5MzliYzQiLCJlbWFpbCI6ImdvZHphbmliQHh5ei5jb20iLCJpYXQiOjE3MTkwMzgzNzksImV4cCI6MTcxOTg0NDc3OX0.r9NURxvwRq61rUslKNnzSOD2gWcKdlE22R5kpu_IG3U' }; // auth header with bearer token

export const fetchAuctions = createAsyncThunk("auctions/fetchAll", () => {
  return axios
    .request({ method: 'get', url: 'http://localhost:8080/auction/', headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ZTU3ZGZmOS01ZTk2LTRlZjYtYTFmMi01OWMxN2E5MzliYzQiLCJlbWFpbCI6ImdvZHphbmliQHh5ei5jb20iLCJpYXQiOjE3MTkwMzgzNzksImV4cCI6MTcxOTg0NDc3OX0.r9NURxvwRq61rUslKNnzSOD2gWcKdlE22R5kpu_IG3U' } })
    .then(response => response.data)
})

export const fetchAuction = createAsyncThunk("auction/fetch", (Id) => {
  return axios
    .get(`http://localhost:8080/auction/${Id}`, {}, { AuthHeader })
    .then(response => response.data)
})

export const fetchAuctionItems = createAsyncThunk("auction/fetchItems", (Id) => {
  return axios
    .get(`http://localhost:8080/items?auction=${Id}`, {}, { AuthHeader })
    .then(response => response.data)
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
    builder.addCase(fetchAuctionItems.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAuctionItems.fulfilled, (state, action) => {
      state.loading = false
      state.Auction.Items = action.payload
    })
    builder.addCase(fetchAuctionItems.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
  }
})
export const AuctionSliceReducer = AuctionSlice.reducer;