import axios from "axios"

const axiosLibrary = axios.create({
  baseURL: "http://localhost:2000",
})

export { axiosLibrary }
