import {
  CloseButton,
  Flex,
  Text,
  Link,
  useColorModeValue,
  Image,
} from "@chakra-ui/react"
import * as React from "react"
import { useDispatch } from "react-redux"
import { remove } from "../redux/features/cartSlice"
import { CartProductMeta } from "./CartProduct"

export const CartItem = (props) => {
  // const { book, rootProps } = props
  const { id, image_url, title } = props || {}
  const dispatch = useDispatch()

  const removeFromCart = () => {
    dispatch(remove(id))
  }

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta title={title} />
      <Image src={image_url} />
      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <CloseButton
          size="lg"
          _hover={{
            color: useColorModeValue("red.300", "red.600"),
            bg: useColorModeValue("blue.600", "blue.200"),
          }}
          aria-label={`Delete ${title} from cart`}
          onClick={removeFromCart}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link
          fontSize="sm"
          textDecor="underline"
          as="button"
          onClick={removeFromCart}
        >
          Delete
        </Link>
      </Flex>
    </Flex>
  )
}
