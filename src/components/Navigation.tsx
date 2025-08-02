import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AddBookForm from "./AddBookForm";
import { useState } from "react";

type NavProps = {
  addNewBook?: (
    title: string, 
    author: string, 
    series: string, 
    rating: number, 
    review: string, 
    image: string, 
    status: string
  ) => void
}

//This component is the NavBar at the top of each page.
//It is designed to be present no matter what page you are on.
//The addNewBook button and elements are part of it, so the function is passed
//as a prop to add to the corresponding button.
//Used React Bootstrap to style.
export default function Navigation({ addNewBook }: NavProps) {

  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const handleAddBookModalClose = () => setIsAddBookModalOpen(false);


  return (
    <>
      <Navbar id="navbar">
        <Container id="navbar-container">
          <Navbar.Brand
            as={Link}
            to="/pages/home"
            style={{ color: "white", background: "#60767a" }}
          >
            <img
              src="../images/book-logo.png"
              width="30"
              height="30"
              style={{ background: "white" }}
              className="d-inline-block align top"
              alt="book logo"
            />{" "}
            Bookshelf
          </Navbar.Brand>
          <Nav className="me-auto" style={{ background: "#60767a" }}>
            <Nav.Link as={Link} to="/pages/Current" style={{ color: "white" }}>
              Current
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/pages/FutureReads"
              style={{ color: "white" }}
            >
              Future Reads
            </Nav.Link>
            <Nav.Link as={Link} to="/pages/Finished" style={{ color: "white" }}>
              Finished
            </Nav.Link>
          </Nav>
        </Container>
        <Button
          type="button"
          id="add-btn"
          onClick={() => setIsAddBookModalOpen(true)}
        >
          + Add New Book
        </Button>
      </Navbar>

      <Modal show={isAddBookModalOpen} onHide={() => setIsAddBookModalOpen(false)}>
        <ModalHeader closeButton>
          <ModalTitle>Add New Book</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <AddBookForm
            addNewBook={addNewBook}
            handleAddBookModalClose={handleAddBookModalClose}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
