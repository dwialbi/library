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
  useToast,
  VStack,
} from "@chakra-ui/react"
import { axiosInstance } from "../api"
import { Link } from "react-router-dom"

export const BooksList = () => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const toast = useToast()
  const [searchValue, setSearchValue] = useState("")

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get(`/books`, {
        params: {
          _limit: 2,
          _page: page,
          _sortDir: "ASC",
          title: searchValue,
        },
      })

      setTotalCount(response.data.dataCount)

      setBooks(response.data.data)

      if (page === 1) {
        setBooks(response.data.data)
      } else {
        setBooks([...books, ...response.data.data])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`)
      fetchBooks()
      toast({ title: "Book deleted", status: "info" })
    } catch (err) {
      console.log(err)
    }
  }

  const renderBookRow = () => {
    return books.map((val) => {
      return (
        <BookRow
          id={val.id}
          title={val.title}
          author={val.author}
          synopsis={val.synopsis.substring(0, 200)}
          publish_year={val.publish_year}
          category={val.Category.name}
          image_url={val.image_url}
          onDelete={() => deleteBtnHandler(val.id)}
        />
      )
    })
  }

  const seeMoreButtonHandler = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    fetchBooks()
  }, [page, searchValue])

  return (
    <Box>
      <Container marginTop={"100px"}>
        <Container>
          <FormControl>
            <HStack>
              <Input
                type="search"
                placeholder="type book title"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <Button
                colorScheme={"orange"}
                onClick={() => {
                  setSearchValue(searchInput)
                  setPage(1)
                }}
              >
                Search
              </Button>
            </HStack>
          </FormControl>
          <Link to={`/add`}>
            <Button width="100%" mt="4" colorScheme={"blackAlpha"}>
              Add Book
            </Button>
          </Link>
        </Container>
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
