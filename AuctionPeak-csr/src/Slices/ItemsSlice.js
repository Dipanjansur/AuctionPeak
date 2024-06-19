import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const InitialState = {
  loading: false,
  erros: null,
  Items: [],
  Item: {}
}

export const fetchItems = createAsyncThunk("items/fetchAll", () => {
  return axios
    .get('http://localhost:9090/items/')
    .then(response => response.data)
})

export const fetchItem = createAsyncThunk("items/fetch", (Id) => {
  return axios
    .get(`http://localhost:9090/items?Id=${Id}`)
    .then(response => response.data)
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