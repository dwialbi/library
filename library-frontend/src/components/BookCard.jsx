import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  Container,
  Button,
  Divider,
} from "@chakra-ui/react"

const BookCard = ({title, author, publish_year, image_url, synopsis, category}) => {
  return (
    <Container maxWidth={"max"} p="12" marginTop={"1"} border="1px">
      <Box
        //marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        border="1px"
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
                src={
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box backgroundSize="20px 20px" opacity="0.4" height="100%" />
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
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {title || "title"}
            </Link>
          </Heading>
          <Text as="p" marginTop="2" fontSize="lg">
            {synopsis || "synopsis"}
          </Text>
          <HStack marginTop="2" spacing="2" display="flex">
            <Text fontWeight="medium">{author || "author"}</Text>
            <Text>—</Text>
            <Text>{publish_year || "publish_year"}</Text>
          </HStack>
          <Button colorScheme="orange" mt={"2"} width={"100px"}>
            Add to cart
          </Button>
          <Divider orientation='horizontal' />
        </Box>
      </Box>
    </Container>
  )
}

export default BookCard
