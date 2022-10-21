import React, { useEffect, useState } from "react"
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
} from "@chakra-ui/react"
import { axiosInstance } from "../api"
import { useParams } from "react-router-dom"

const BookDetails = () => {
  const [book, setBook] = useState({})
  const params = useParams()

  const fetchBookDetails = async () => {
    try {
      const response = await axiosInstance.get(`/books/${params.id}`)

      setBook(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchBookDetails()
  }, [])

  return (
    <Container maxW={"7xl"} p="2" mt="100px">

      <Box
        //marginTop={{ base: '3', sm: '' }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                height="500px"
                width="100%"
                src={book.image_url}
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(orange.600 1px, transparent 1px)",
                "radial(orange.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <HStack spacing={2}>
            <Tag size={"md"} variant="solid" colorScheme="orange">
              {book?.Category?.name}
            </Tag>
          </HStack>
          <Heading marginTop="1" size={"lg"}>
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {book.title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            {book.synopsis || "synopsis"}
          </Text>
         
          <HStack marginTop="2" spacing="2" display="flex">
            <Text fontWeight="medium">{book.author || "author"}, author</Text>
            <Text>—</Text>
            <Text>{book.publish_year || "publish_year"}</Text>
          </HStack>
          <Text mt="2" mb="10">ISBN: {book.isbn}</Text>
          

          <Button colorScheme="orange" mt={"2"} width={"100px"}>
            Add to cart
          </Button>
        </Box>
      </Box>
      <Divider marginTop={"50px"} />
    </Container>
  )
}

export default BookDetails
