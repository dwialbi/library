import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome <br />
            <Text as={"span"} color={"green.400"}>
              to Digital Library
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Digital Library is an open, editable library catalog, building
            towards a web page for every book ever published. We Appreciate
            you've come this far~
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              <Link to="/register">Register</Link>
            </Button>
            {/* <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              Learn more
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default Home
