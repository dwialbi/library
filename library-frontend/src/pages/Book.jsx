import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react"
import { FiShoppingCart } from "react-icons/fi"

const data = {
  isNew: true,
  name: "Den of Vipers",
  rating: 4.2,
  numReviews: 34,
}

const BookPage = () => {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}
        <Box alignContent="end">
          <Image
            src="https://covers.zlibcdn2.com/covers299/books/d8/df/a3/d8dfa3bd0dafe7be02e6ba3f6edbe188.jpg"
            alt={`Picture of ${data.name}`}
            roundedTop="lg"
          />
        </Box>
        {/* <Image
          src="https://covers.zlibcdn2.com/covers299/books/d8/df/a3/d8dfa3bd0dafe7be02e6ba3f6edbe188.jpg"
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
        /> */}

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
            </Box>

            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                K.A. KNIGHT
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default BookPage
