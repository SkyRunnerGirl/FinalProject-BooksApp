import type { Book } from "../types";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import UpdateBookForm from "./UpdateBookForm";

type BookCardProps = {
  book: Book;
  deleteBook: (id: number, bookType: string) => void;
  updateBook: (
    bookId: number,
    updatedData: Omit<Book, "id">,
    bookType: string
  ) => void;
  selectedBook: Book | undefined;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (newValue: boolean) => void
  handleUpdateButtonClick: (bookId: number) => void
};

export default function BookCard({
  book,
  selectedBook,
  updateBook,
  deleteBook,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  handleUpdateButtonClick,
}: BookCardProps) {
  const handleUpdateBookClose = () => setIsUpdateModalOpen(false);
  console.log("BookCard", selectedBook);
  return (
    <>
      <div id="card-container">
        <div
          className="card m-2"
          style={{ maxWidth: "540px", minWidth: "540px" }}
          key={book.id}
          id="bookcard"
        >
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center">
              <img
                id="bookcard-image"
                src={book.image}
                className="img-fluid rounded-start"
                alt={book.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Series: {book.series}</p>
                <p className="card-text">Review: {book.review}</p>
                <p className="card-text">Rating: {book.rating}</p>
                <p className="card-text">Status: {book.status}</p>
              </div>
              <div className="d-flex gap-5 justify-content-center pb-2">
                <Button
                  id="update-btn"
                  type="button"
                  className="btn"
                  onClick={() => {
                    handleUpdateButtonClick(book.id);
                    console.log(book);
                  }}
                >
                  Update
                </Button>
                <Button
                  id="delete-btn"
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteBook(book.id, book.status)}
                >
                  Delete
                </Button>
              </div>

              <Modal
                show={isUpdateModalOpen}
                onHide={() => setIsUpdateModalOpen(false)}
              >
                <ModalHeader closeButton>
                  <ModalTitle>Update Book</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <UpdateBookForm
                    updateBook={updateBook}
                    handleUpdateBookClose={handleUpdateBookClose}
                    selectedBook={selectedBook}
                  />
                </ModalBody>
              </Modal>
            </div>{" "}
            {/*col-md-8*/}
          </div>
        </div>
      </div>
    </>
  );
}
