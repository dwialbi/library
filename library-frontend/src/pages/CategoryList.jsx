import {
  Box,
  Container,
  Tbody,
  Text,
  Thead,
  Tr,
  Th,
  Table,
  useToast,
  Button,
  GridItem,
  FormControl,
  Grid,
  FormLabel,
  Input,
  Td,
  Image,
  FormErrorMessage,
  Link as ChakraLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { axiosLibrary } from "../api"
import { useFormik } from "formik"
import axios from "axios"
import * as Yup from "yup"
import EditModal from "../components/ModalEdit"

const CategoryList = () => {
  const [categorys, setCategorys] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [nameEdit, setNameEdit] = useState("")
  const [idEdit, setIdEdit] = useState("")

  const fetchCategory = async () => {
    try {
      const response = await axiosLibrary.get("/categories")

      setCategorys(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBtnHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/Categories/${id}`)
      fetchCategory()
      toast({ title: "Category deleted", status: "info" })
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (name, id) => {
    setOpenModal(true)
    setNameEdit(name)
    setIdEdit(id)
  }

  const renderCategorys = () => {
    return categorys.map((val) => {
      return (
        <Tr key={val.id}>
          <Td>{val.name}</Td>

          <Td>
            <Button
              onClick={() => handleEdit(val.name, val.id)}
              mx="3"
              colorScheme="blue"
            >
              Edit
            </Button>

            <Button
              onClick={() => deleteBtnHandler(val.id)}
              mx="1"
              colorScheme="red"
            >
              Delete
            </Button>
          </Td>
        </Tr>
      )
    })
  }
  useEffect(() => {
    fetchCategory()
  }, [])

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: async (values) => {
      try {
        const { name } = values

        let newCategory = {
          name,
        }

        await axiosLibrary.post(`/Categories/`, newCategory)
        formik.setFieldValue(name, "")

        fetchCategory()
        toast({
          title: "Category added",
          status: "success",
        })
      } catch (err) {
        toast({
          title: "Network error",
          status: "error",
        })
        console.log(err)
      }
    },

    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    validateOnChange: false,
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    console.log(name, value, "!!!!!")

    formik.setFieldValue(name, value)
  }
  const toast = useToast()

  return (
    <>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditModal
          nameEdit={nameEdit}
          setNameEdit={setNameEdit}
          idEdit={idEdit}
          setOpenModal={setOpenModal}
          fetchCategory={fetchCategory}
        />
      </Modal>

      <Container maxW="container.lg">
        <Text fontWeight="bold" fontSize="4xl" mb="16">
          Category List
        </Text>

        <Grid templateColumns="repeat(3, 1fr)" columnGap="4">
          <GridItem>
            <FormControl isInvalid={formik.errors.name}>
              <FormLabel>Name</FormLabel>
              <Input name="name" onChange={formChangeHandler} />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Button
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
          my="4"
          colorScheme="teal"
        >
          Add Category
        </Button>

        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>{renderCategorys()}</Tbody>
        </Table>
      </Container>
    </>
  )
}

export default CategoryList
