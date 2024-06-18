import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const InitialState = {
  loading: false,
  erros: null,
  Items: [],
  Item: {}
}

export const fetchItems = createAsyncThunk("auctions/fetchAll", () => {
  return axios
    .get('http://localhost:9090/bids/')
    .then(response => response.data)
})

export const fetchItem = createAsyncThunk("auctions/fetchAll", (Id) => {
  return axios
    .get(`http://localhost:9090/bids?Id=${Id}`)
    .then(response => response.data)
})


const ItemSlice = createSlice({
  name: "auctions",
  InitialState,
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
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
      state.data = action.payload
    })
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload
    })
  }
})
export const ItemSliceReducer = ItemSlice.reducer;