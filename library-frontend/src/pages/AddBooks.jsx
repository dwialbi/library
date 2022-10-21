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
import React, { useState } from "react"
import axios from "axios"
import { useFormik } from "formik"
import { axiosLibrary } from "../api"
import * as Yup from "yup"


const AddBooks = () => {

  const toast = useToast()

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
        const response = await axiosLibrary.post("/books", {
          title,
          author,
          publish_year,
          stock,
          image_url,
          synopsis,
          isbn,
          CategoryId,
        })

        formik.setFieldValue("title", "")
        formik.setFieldValue("author", "")
        formik.setFieldValue("publish_year", "")
        formik.setFieldValue("stock", "")
        formik.setFieldValue("image_url", "")
        formik.setFieldValue("synopsis", "")
        formik.setFieldValue("isbn", "")
        formik.setFieldValue("CategoryId", "")

        toast({
          title: "Book added",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        toast({
          title: "add book failed",
          description: err.response.data.message,
          status: "error",
        })
        console.log(err)
      }
    },
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Container p="15">
        <Heading mt="10" mb="4">Add Book</Heading>
      <form onSubmit={formik.handleSubmit} width="200px">
        <VStack>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={formik.values.title}
              onChange={formChangeHandler}
              name="title"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input 
            value={formik.values.author} 
            onChange={formChangeHandler}
            name="author" />
          </FormControl>
          <FormControl>
            <FormLabel>Publish_year</FormLabel>
            <Input
              value={formik.values.publish_year}
              onChange={formChangeHandler}
              name="publish_year"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <Input value={formik.values.stock} 
            onChange={formChangeHandler}
            name="stock" />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              value={formik.values.image_url}
              onChange={formChangeHandler}
              name="image_url"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Synopsis</FormLabel>
            <Input
              value={formik.values.synopsis}
              onChange={formChangeHandler}
              name="synopsis"
            />
          </FormControl>
          <FormControl>
            <FormLabel>ISBN</FormLabel>
            <Input value={formik.values.isbn} 
            onChange={formChangeHandler}
            name="isbn" />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              value={formik.values.CategoryId}
              onChange={formChangeHandler}
              name="CategoryId"
              mb="4"
            />
          </FormControl>
          <Button type="submit" colorScheme={"orange"} w="100%" mt="4">
            Add
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default AddBooks
