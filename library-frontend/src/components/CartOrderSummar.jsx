import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import * as React from "react"
import { FaArrowRight } from "react-icons/fa"

// const OrderSummaryItem = (props) => {
//   const { label, value, children } = props
//   return (
//     <Flex justify="space-between" fontSize="sm">
//       <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
//         {label}
//       </Text>
//       {value ? <Text fontWeight="medium">{value}</Text> : children}
//     </Flex>
//   )
// }

export const CartOrderSummary = (props) => {
  const { books } = props
  let total = 0
  books?.forEach((book) => {
    total += book.quantity
  })

  let totalMessage = "$" + total

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        {/* <OrderSummaryItem label="Subtotal" value={totalMessage} />
        <OrderSummaryItem label="Quantity">
          <Link href="#" textDecor="underline">
            Calculate quantity
          </Link>
        </OrderSummaryItem> */}

        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Quantity
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {totalMessage}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  )
}