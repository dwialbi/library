import React from "react"
import BookRow from "../components/BookRow"
import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react"
import { axiosInstance } from "../api"

export const BooksList = () => {
  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books")
      setBooks(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderBookRow = () => {
    return books.map((val) => {
      return (
        <BookRow
          // key={val.id.toString()}
          id={val.id}
          title={val.title}
          author={val.author}
          synopsis={val.synopsis.substring(0, 200)}
          publish_year={val.publish_year}
          category={val.Category.name}
          image_url={val.image_url}
        />
      )
    })
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <Box>
      <Container marginTop={"100px"}>
        <HStack>
          <Input placeholder="type book title"/>
          <Button colorScheme={"orange"} >Search</Button>
        </HStack>
      </Container>
      {renderBookRow()}
    </Box>
  )
}
