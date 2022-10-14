import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const tempProduct = { ...action.payload, cartQuantity: 1 }
      state.cartItems.push(tempProduct)
    },
  },
})

export const { addToCart } = cartSlice.action

export default cartSlice.reducer
