import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  NIM: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id
      state.NIM = action.payload.NIM
      state.username = action.payload.username
    },
    logout: (state) => {
      state.id = 0
      state.NIM = ""
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
