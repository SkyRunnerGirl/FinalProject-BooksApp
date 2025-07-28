import { useEffect } from "react";
import { Modal, ModalBody, ModalTitle } from "react-bootstrap";
import type { Book } from "../types";
import BookCard from "../components/BookCard";
import { useOutletContext } from "react-router-dom";

export default function Finished() {
  const { fetchBooks, books } = useOutletContext();

  useEffect(() => {
    fetchBooks("finished");
  }, []);

  //const selectedFinishedBook = finished.find((book) => book.id === selectedBookId);

  //const [isAddFinishedBookModalOpen, setIsAddFinishedBookModalOpen] = useState(false);

  //const handleAddBookClose = () => setIsAddFinishedBookModalOpen(false);

  return (
    <>
      <h1 id="finished-h1">Past Adventures</h1>
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
        show={isAddFinishedBookModalOpen}
        onHide={() => setIsAddFinishedBookModalOpen(false)}
      >
        <Modal.Header closeButton>
          <ModalTitle>Add New Book</ModalTitle>
        </Modal.Header>

        <ModalBody>
          <AddBookForm
          // addNewBook={addNewBook}
          //  handleAddBookClose={handleAddBookClose}
          />
        </ModalBody>
      </Modal> */}
    </>
  );
}
