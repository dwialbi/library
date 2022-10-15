import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Divider,
} from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Tabs
        mt="1"
        mb="2"
        align="center"
        variant="soft-rounded"
        colorScheme="green"
      >
        <TabList>
          <Tab>HOME</Tab>
          <Tab>BOOKS</Tab>
          <Tab>LOGIN</Tab>
          <Tab>
            <Link to="/register">REGISTER</Link>
          </Tab>
        </TabList>
      </Tabs>
      <Divider border="1px solid" />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
