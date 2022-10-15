import {
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { axiosLibrary } from "../api"
import { login } from "../redux/features/authSlice"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      NIM: "",
      password: "",
    },
    onSubmit: async ({ NIM, password }) => {
      try {
        const response = await axiosLibrary.post("/auth/login", {
          NIM,
          password,
        })

        localStorage.setItem("auth_token", response.data.token)
        dispatch(
          login({
            NIM: response.data.data.NIM,
            username: response.data.data.username,
            id: response.data.data.id,
          })
        )
        toast({
          title: "Login success",
          description: response.data.message,
          status: "success",
        })
        // navigate("/")
      } catch (err) {
        console.log(err)
        toast({
          title: "Login Failed",
          description: err.response.data.message,
          status: "error",
        })
      }
    },
  })

  const formChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"} align="center">
              LOG IN
            </Heading>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>NIM</FormLabel>
                <Input
                  name="NIM"
                  type="NIM"
                  value={formik.values.NIM}
                  onChange={formChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    value={formik.values.password}
                    onChange={formChange}
                    type={showPassword ? "text" : "password"}
                    // value={formik.values.password}
                    // onChange={formChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.500"}>Forgot password?</Link>
                </Stack>
                <Button type="submit" colorScheme={"green"} variant={"solid"}>
                  Log in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            }
          />
        </Flex>
      </Stack>
    </>
  )
}

export default LoginPage
