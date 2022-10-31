import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { axiosLibrary } from "../api"

const EditModal = (props) => {
  const toast = useToast()
  const { nameEdit, setNameEdit, idEdit, setOpenModal, fetchCategory } = props

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async ({ name }) => {
      try {
        let editedBook = {
          name: nameEdit,
        }

        const response = await axiosLibrary.patch(
          `/categories/${idEdit}`,
          editedBook
        )

        setOpenModal(false)
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

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Container
              maxW="container.lg"
              w={"400px"}
              align={"center"}
              padding={"10px"}
              ringColor={"blue.500"}
            >
              <FormControl>
                <FormLabel>
                  Name
                  <Input
                    value={nameEdit}
                    onChange={(e) => setNameEdit(e.target.value)}
                    name="name"
                  />
                </FormLabel>
              </FormControl>
            </Container>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
            Edit Data
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default EditModal
