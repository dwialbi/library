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
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { axiosLibrary } from "../api"
import { Link } from "react-router-dom"

export const BooksList = () => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const toast = useToast()
  const [searchValue, setSearchValue] = useState("")
  const [sort, setSort] = useState("ASC")

  const fetchBooks = async () => {
    try {
      const response = await axiosLibrary.get(`/books`, {
        params: {
          _limit: 5,
          _page: page,
          _sortDir: sort,
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

  const deleteBook = async (id) => {
    try {
      await axiosLibrary.delete(`/books/${id}`)
      fetchBooks()
      setPage(1)
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
          onDelete={() => deleteBook(val.id)}
        />
      )
    })
  }

  const seeMoreButtonHandler = () => {
    setPage(page + 1)
  }

  const sortBtnHandler = (e) => {
    const selectedSort = e.target.value
    setSort(selectedSort)
    setPage(1)
  }

  const searchBtnHandler = () => {
    setSearchValue(searchInput)
    setPage(1)
  }

  useEffect(() => {
    fetchBooks()
  }, [page, searchValue, sort])

  return (
    <Box>
      <Container marginTop={"100px"}>
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
              onClick={searchBtnHandler}
            >
              Search
            </Button>
          </HStack>
        </FormControl>
        <Link to={`/add`}>
          <Button width="100%" mt="4" colorScheme={"blackAlpha"} mb="5">
            Add Book
          </Button>
        </Link>
      </Container>

      <VStack marginBottom={"100px"}>
        <HStack w="65%" justifyContent={"flex-end"} mt="4">
          <Text>Sort:</Text>
          <Select onChange={sortBtnHandler} value={sort} w="150px">
            <option value="ASC">A - Z</option>
            <option value="DESC">Z - A</option>
          </Select>
        </HStack>
        {renderBookRow()}
        {books.length >= totalCount ? null : (
          <Button
            onClick={seeMoreButtonHandler}
            colorScheme={"orange"}
            m="100px"
            width={"50%"}
          >
            See More
          </Button>
        )}
      </VStack>
    </Box>
  )
}
