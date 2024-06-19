import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { AuctionSliceReducer } from "./AuctionSlice"
import { BidsSliceReducer } from "./BidsSlice"
import { ItemSliceReducer } from "./ItemsSlice"

const reducers = combineReducers({
  auction: AuctionSliceReducer,
  bids: BidsSliceReducer,
  item: ItemSliceReducer
})
export const states = configureStore({
  reducer: reducers
})