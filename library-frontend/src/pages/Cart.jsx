import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { CartOrderSummary } from "../components/CartOrderSummar"
import { CartItem } from "../components/CartItem"
// import { NavItem } from "../components/Header"
// import NextLink from "next/link"
import { axiosLibrary } from "../api"
import { useEffect, useState } from "react"
// import { useEffect } from "react"

const Cart = ({ CartId }) => {
  const cart = useSelector((state) => state.cart)

  // const Book = [
  //   {
  //     id: 1,
  //     title: "The Hitchhiker's Guide to the Galaxy",
  //     author: "Douglas ANNdams",
  //     stock: 2,
  //     image_url: "https://images.gr-assets.com/books/1388282444l/386162.jpg",
  //   },
  // ]

  const [carts, setCarts] = useState([])

  const fetchCarts = async () => {
    try {
      const response = await axiosLibrary.get("/carts", {
        params: {
          CartId,
          _expand: "user",
        },
      })

      setCarts(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderCart = () => {
    return carts.map((cart) => {
      return <CartItem />
    })
  }
  useEffect(() => {
    fetchCarts()
  }, [])

  return (
    <Box
      minH="90vh"
      maxW={{
        base: "3xl",
        lg: "7xl",
      }}
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        align={{
          lg: "flex-start",
        }}
        spacing={{
          base: "8",
          md: "16",
        }}
      >
        <Stack
          spacing={{
            base: "8",
            md: "10",
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ( item)
          </Heading>

          <Stack spacing="6">
            {carts.map((carts) => (
              <CartItem key={carts.id} carts={carts} />
            ))}
          </Stack>
        </Stack>
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary cart={cart} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            {/* <NextLink href="/" passHref>
              <NavItem key="continue">Continue Shopping</NavItem>
            </NextLink> */}
            <Link to={`/books`}>
              <Button>Continue Shopping</Button>
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default Cart
