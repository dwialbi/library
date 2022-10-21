import React from "react"
import {
  Box,
  Heading,
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
  useToast,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"



const BookRow = ({
  title,
  author,
  publish_year,
  image_url,
  synopsis,
  category,
  id,
  onDelete
}) => {

    const deleteBtnHandler = () => {
        onDelete()
      }

  return (
    
    <Container maxW={"7xl"} p="5">
      <Box
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
            <Link to={`/books/${id}`} >
              <Image
                borderRadius="lg"
                height="300px"
                width="100%"
                src={image_url}
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
              {category}
            </Tag>
          </HStack>
          <Heading marginTop="1" size={"lg"}>
            <Link to={`/books/${id}`}>
              {title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            {synopsis || "synopsis"}
            <Link to={`/books/${id}`}> ...see more</Link>
          </Text>
          <HStack marginTop="2" spacing="2" display="flex">
            <Text fontWeight="medium">{author || "author"}, author</Text>
            <Text>—</Text>
            <Text>{publish_year || "publish_year"}</Text>
          </HStack>

          <HStack>
          <Button colorScheme="orange" mt={"2"} width={"100px"}>
            Add to cart
          </Button>
          <Link to={`/edit/${id}`}>
          <Button colorScheme="blackAlpha" mt={"2"} width={"100px"}>
            Edit
          </Button>
          </Link>
          <Link>
          
          <Button 
          onClick={deleteBtnHandler}
          colorScheme="blackAlpha" 
          mt={"2"} 
          width={"100px"}>
            Delete
          </Button>
          </Link>
          
          </HStack>
        </Box>
      </Box>
      <Divider marginTop={"50px"} />
    </Container>
  )
}

export default BookRow
