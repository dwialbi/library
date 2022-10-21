import {
  useToast,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Link,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { axiosLibrary } from "../api"
import { Form, useFormik } from "formik"
import { useState } from "react"

const CategoryEdit = () => {
  const params = useParams()
  const toast = useToast()

  const [categorys, setCategorys] = useState({})

  // const [name, setName] = useState(categorys.name)

  const fetchCategory = async () => {
    try {
      const response = await axiosLibrary.get(`/categories/${params.id}`)

      setCategorys(response.data.data)

      formik.setFieldValue("name", response.data.data.name)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async ({ name }) => {
      try {
        let editedBook = {
          name,
        }

        const response = await axiosLibrary.patch(
          `/categories/${params.id}`,
          editedBook
        )

        fetchCategory()
        toast({
          title: "Category edited",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        toast({
          title: "Edit failed",
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
    <Box>
      <Container
        maxW="container.lg"
        w={"500px"}
        align={"center"}
        padding={"10px"}
        ringColor={"blue.500"}
      >
        <FormControl>
          <FormLabel>
            Name
            <Input
              onChange={formChangeHandler}
              defaultValue={categorys.name}
              name="name"
            />
          </FormLabel>
        </FormControl>

        <Button onClick={formik.handleSubmit}>
          Edit Data <Link to={`/categories`}> </Link>
        </Button>
      </Container>
    </Box>
  )
}

export default CategoryEdit
