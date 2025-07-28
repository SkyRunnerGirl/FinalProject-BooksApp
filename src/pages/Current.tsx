import { useEffect, useState } from "react";
import type { Book } from "../types";
import AddCurrentBookForm from "../components/AddBookForm";
import UpdateBookForm from "../components/UpdateBookForm";
import { Button, Modal, ModalBody, ModalTitle } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import BookCard from "../components/BookCard";

export default function Current() {
  const { fetchBooks, books } = useOutletContext();

  useEffect(() => {
    fetchBooks("current");
  }, []);

  // const [statusValue, setStatusValue] = useState("");

  //const selectedCurrentBook = current.find((book) => book.id === selectedBookId);

  // const addNewCurrentBook = async (
  //   bookData: Omit<Book, "id, rating, review">
  // ) => {
  //   const newCurrentBook = {
  //     id: current.length ? current[current.length - 1].id + 1 : 0,
  //     title: bookData.title,
  //     author: bookData.author,
  //     series: bookData.series,
  //     image: bookData.image,
  //     status: bookData.status
  //   };
  //   const response = await fetch("http://localhost:3000/current", {
  //     method: "POST",
  //     body: JSON.stringify({ newCurrentBook }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   if (!response.ok) {
  //     setErrorMessage(response.statusText)
  //   }
  //   setCurrent([newCurrentBook, ...current]);
  // };

  // const updateCurrentBook = (
  //   property: string,
  //   newValue: string,
  //   idToUpdate: number
  // ) => {
  //   if (idToUpdate === undefined) {
  //     return;
  //   }
  //   setCurrent((current) =>
  //     current.map((book) =>
  //       book.id !== idToUpdate ? book : { ...book, [property]: newValue }
  //     )
  //   );
  // };

  // const deleteCurrentBook = (idToDelete: number) => {
  //   setCurrent(current.filter((book) => book.id !== idToDelete));
  // };

  // const handleAddCurrentBookClose = () => setIsAddCurrentBookModalOpen(false)

  return (
    <>
        <h1 id="current-h1">Current Adventure</h1>
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
          show={isAddCurrentBookModalOpen}
          onHide={() => setIsAddCurrentBookModalOpen(false)}
        >
          <Modal.Header closeButton>
            <ModalTitle>Add New Current Book</ModalTitle>
          </Modal.Header>

          <ModalBody>
            <AddCurrentBookForm
              addNewCurrentBook={addNewCurrentBook}
              handleAddCurrentBookClose={handleAddCurrentBookClose}
            />
          </ModalBody>
        </Modal>

        <Modal
          show={isUpdateBookModalOpen}
          onHide={() => setIsUpdateBookModalOpen(false)}
        >
          <Modal.Header closeButton>
            <ModalTitle>Update Current Book</ModalTitle>
          </Modal.Header>

          <ModalBody>
            <UpdateBookForm
              selectedBook={selectedCurrentBook}
              selectedBookId={selectedCurrentBookId}
              setSelectedBookId={setSelectedBookId}
              updateBook={updateCurrentBook}
              handleUpdateBookClose={handleUpdateBookClose}
            ></UpdateBookForm>
          </ModalBody>
        </Modal> */}

    </>
  );
}