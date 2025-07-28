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
import type { Book } from "../types";

type NavProps = {
  addNewBook: (bookData: Omit<Book, "id">, bookType: string) => void
}

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
              src="../public/images/book-logo.png"
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
