import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Divider,
  Heading,
  Text,
  Menu,
  MenuItem,
  MenuDivider,
  MenuButton,
  Button,
  MenuList,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom"
import LoginPage from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { logout, login } from "./redux/features/authSlice"
import { axiosLibrary } from "./api"
import { useState, useEffect } from "react"

function App() {
  const [authCheck, setAuthCheck] = useState(false)

  const authSelector = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate

  const keepUserLogin = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosLibrary.get("/auth/refresh-token", {
        headers: {
          authorization: `Bearer ${auth_token}`,
        },
      })

      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }

  const btnLogout = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout())
    navigate("/")
  }

  useEffect(() => {
    keepUserLogin()
  }, [])

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
          <Tab>
            <Link to="/">HOME</Link>
          </Tab>
          <Tab>BOOKS</Tab>
          <Tab>
            <Link to="/login">LOGIN</Link>
          </Tab>
          <Tab>
            <Link to="/register">REGISTER</Link>
          </Tab>
        </TabList>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Text mr="50">Hai {authSelector.username}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem>
              <Link onClick={btnLogout} to="/">
                Logout
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Tabs>

      <Divider border="1px solid" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
