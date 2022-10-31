import { Box } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"

// import HomePage from "./pages/Home"
import Cart from "./pages/Cart"
import GuestRoute from "./components/GuestRoute"

import CategoryList from "./pages/CategoryList"

const App = () => {
  return (
    <Box>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route
          path="/carts"
          element={
            <GuestRoute>
              <Cart />
            </GuestRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <GuestRoute>
              <CategoryList />
            </GuestRoute>
          }
        />
      </Routes>
    </Box>
  )
}

export default App
