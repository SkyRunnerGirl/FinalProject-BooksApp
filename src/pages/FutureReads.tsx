import { Modal, ModalBody, ModalTitle } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Book } from "../types";
import BookCard from "../components/BookCard";
import { useOutletContext } from "react-router-dom";

export default function FutureReads() {
  const { fetchBooks, books } = useOutletContext();

  useEffect(() => {
    fetchBooks("future");
  }, []);

  //const selectedFutureBook = future.find((book) => book.id === selectedBookId);

  //const [isAddFutureBookModalOpen, setIsAddFutureBookModalOpen] = useState(false);

  //const handleAddFutureBookClose = () => setIsAddFutureBookModalOpen(false);

  return (
    <>
      <h1 id="future-h1">Upcoming Adventures</h1>
      <div>
          {Object.values(books).length > 0 &&
            Object.values(books).map((book) => (
              <BookCard
                key={book.id}
                book={book}
                //deleteBook={deleteBook}
                //updateBook={updateBook}
              />
            ))}
      </div>

      {/* <Modal
        show={isAddFutureBookModalOpen}
        onHide={() => setIsAddFutureBookModalOpen(false)}
      >
        <Modal.Header closeButton>
          <ModalTitle>Add New Future Book</ModalTitle>
        </Modal.Header>

        <ModalBody>
          <AddFutureBookForm
            addNewFutureBook={addNewFutureBook}
            handleAddFutureBookClose={handleAddFutureBookClose}
          />
        </ModalBody>
      </Modal> */}
    </>
  );
}
