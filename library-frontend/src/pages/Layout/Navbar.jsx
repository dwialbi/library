import { ReactNode } from "react"
import {
  Text,
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Link as LinkChakra,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Routes,
  Route,
  Link as LinkRouterDom,
  Navigate,
  useNavigate,
} from "react-router-dom"
import { logout, login } from "../../redux/features/authSlice"
import { axiosLibrary } from "../../api"
import LoginPage from "../../pages/Login"
import Register from "../../pages/Register"
import Home from "../../pages/Home"

const Links = ["Home", "Books", "About"]

const NavLink = ({ children }) => (
  <LinkChakra
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </LinkChakra>
)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    navigate("/navbar")
  }

  useEffect(() => {
    keepUserLogin()
  }, [])

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Heading size="md">Digital Library</Heading>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink>
                <LinkRouterDom to="/">Home</LinkRouterDom>
              </NavLink>
              <NavLink>
                <LinkRouterDom to="/booklist">Book</LinkRouterDom>
              </NavLink>
              <NavLink>About</NavLink>
              {authSelector.username ? null : (
                <NavLink>
                  <LinkRouterDom to="/login">Login</LinkRouterDom>
                </NavLink>
              )}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Heading size="lg">{authSelector.username}</Heading>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem fontWeight="500">
                  <LinkRouterDom onClick={btnLogout} to="/">
                    Logout
                  </LinkRouterDom>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink to="/">Home</NavLink>
              <NavLink>Books</NavLink>
              <NavLink>About</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        {/* <Route path="/book" element={<BookPage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default Navbar
