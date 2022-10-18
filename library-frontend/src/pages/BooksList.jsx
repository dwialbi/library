import React from "react"
import BookRow from "../components/BookRow"
import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react"
import { axiosInstance } from "../api"

export const BooksList = () => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books", {
        params: {
          _limit: 2,
          _page: page,
          _sortDir: "ASC"
        },
      })

      setTotalCount(response.data.dataCount)

      if(page === 1) {
        setBooks(response.data.data)
      } else {
        setBooks([...books, ...response.data.data])
      }

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

  const seeMoreButtonHandler = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    fetchBooks()
  }, [page])

  return (
    <Box>
      <Container marginTop={"100px"}>
        <FormControl>
          <HStack>
            <Input placeholder="type book title" />
            <Button colorScheme={"orange"}>Search</Button>
          </HStack>
        </FormControl>
      </Container>
      <VStack marginBottom={"100px"}>
        {renderBookRow()}
        {books.length >= totalCount ? null : (
          <Button
            onClick={seeMoreButtonHandler}
            colorScheme={"orange"}
            m="100px"
            width={"50%"}
            border="1px"
          >
            See More
          </Button>
        )}
      </VStack>
    </Box>
  )
}
