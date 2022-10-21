import { configureStore, createReducer } from "@reduxjs/toolkit"

import cartSlice from "./features/cartSlice"

export const store = configureStore({
  reducer: cartSlice,
})
