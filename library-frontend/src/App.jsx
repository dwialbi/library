
import { BooksList } from "./pages/BooksList";
import { Route, Routes } from "react-router-dom"
import AddBooks from "./pages/AddBooks";
import EditBooks from "./pages/EditBooks";
import BookDetails from "./pages/BookDetails";
import Navbar from "./pages/Layout/Navbar";

function App() {
  return (
  <Navbar />
   <Routes>
    <Route path="/" element={<BooksList/>}/>
    <Route path="/add" element={<AddBooks/>}/>
    <Route path="/edit/:id" element={<EditBooks/>}/>
    <Route path="/books/:id" element={<BookDetails/>}/>
   </Routes>
    
  );
}

export default App
