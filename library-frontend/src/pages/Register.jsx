import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useFormik } from "formik"
import { axiosLibrary } from "../api/index"
import * as Yup from "yup"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      NIM: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ NIM, username, email, password }) => {
      try {
        const response = await axiosLibrary.post("/auth/register", {
          NIM,
          username,
          email,
          password,
        })
        toast({
          title: "Registration Success",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Sign up failed !",
          description: err.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      NIM: Yup.string().required().min(5),
      username: Yup.string().required().min(4).max(6),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const formChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Flex
      minH={"100"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"max"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Register
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to access Digital Library
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isInvalid={formik.errors.NIM} isRequired>
                    <FormLabel>NIM</FormLabel>
                    <Input
                      name="NIM"
                      type="NIM"
                      value={formik.values.NIM}
                      onChange={formChange}
                    />
                    <FormErrorMessage>{formik.errors.NIM}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      name="username"
                      type="username"
                      value={formik.values.username}
                      onChange={formChange}
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formChange}
                />
              </FormControl>

              <FormControl isInvalid={formik.errors.password} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formChange}
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
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={"blue.900"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?
                  <Link to="/login">
                    <Text color="blue.400">Login</Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register
