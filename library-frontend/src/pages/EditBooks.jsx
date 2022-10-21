import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import { axiosInstance } from "../api"
import { useParams } from "react-router-dom"

const EditBooks = () => {
  const toast = useToast()
  const [book, setBook] = useState({})
  const params = useParams()

  const fetchBook = async () => {
    try {
      const response = await axiosInstance.get(`/books/${params.id}`)

      setBook(response.data.data)

      formik.setFieldValue("title", response.data.data.title)
      formik.setFieldValue("author", response.data.data.author)
      formik.setFieldValue("publish_year", response.data.data.publish_year)
      formik.setFieldValue("stock", response.data.data.stock)
      formik.setFieldValue("image_url", response.data.data.image_url)
      formik.setFieldValue("synopsis", response.data.data.synopsis)
      formik.setFieldValue("isbn", response.data.data.isbn)
      formik.setFieldValue("CategoryId", response.data.data.CategoryId)
    } catch (err) {
      console.log(err)
    }
  }

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  useEffect(() => {
    fetchBook()
  }, [])

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publish_year: "",
      stock: 0,
      image_url: "",
      synopsis: "",
      isbn: "",
      CategoryId: "",
    },
    onSubmit: async ({
      title,
      author,
      publish_year,
      stock,
      image_url,
      synopsis,
      isbn,
      CategoryId,
    }) => {
      try {
        let editedBook = {
          title,
          author,
          publish_year,
          stock,
          image_url,
          synopsis,
          isbn,
          CategoryId,
        }

        const response = await axiosInstance.patch(`/books/${book.id}`,editedBook)

        fetchBook()

        toast({
          title: "Book Updated",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        toast({
          title: "add update failed",
          description: err.response.data.message,
          status: "error",
        })
        console.log(err)
      }
    },
  })

  return (
    <Container p="15">
      <Heading mt="10" mb="4">
        Edit Book
      </Heading>
      <form onSubmit={formik.handleSubmit} width="200px">
        <VStack>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              defaultValue={book.title}
              onChange={formChangeHandler}
              name="title"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input
              defaultValue={book.author}
              onChange={formChangeHandler}
              name="author"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Publish_year</FormLabel>
            <Input
              defaultValue={book.publish_year}
              onChange={formChangeHandler}
              name="publish_year"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <Input
              defaultValue={book.stock}
              onChange={formChangeHandler}
              name="stock"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              defaultValue={book.image_url}
              onChange={formChangeHandler}
              name="image_url"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Synopsis</FormLabel>
            <Input
              defaultValue={book.synopsis}
              onChange={formChangeHandler}
              name="synopsis"
            />
          </FormControl>
          <FormControl>
            <FormLabel>ISBN</FormLabel>
            <Input
              defaultValue={book.isbn}
              onChange={formChangeHandler}
              name="isbn"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              defaultValue={book.CategoryId}
              onChange={formChangeHandler}
              name="CategoryId"
              mb="4"
            />
          </FormControl>
          <Button onClick={formik.handleSubmit} colorScheme={"orange"} w="100%" mt="4">
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default EditBooks
