import axios from "axios"

const axioslibrary = axios.create({
  baseURL: "http://localhost:2000",
})

export { axioslibrary }
