import { useEffect } from "react";
import type { Book } from "../types";
import BookCard from "../components/BookCard";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  books: Book;
  fetchBooks: (bookType: string) => void;
  updateBook: (
    bookId: number,
    updatedData: Omit<Book, "id">,
    bookType: string
  ) => void;
  deleteBook: (bookId: number, bookType: string) => void;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (newValue: boolean) => void;
  handleUpdateButtonClick: (bookId: number) => void
};

export default function FutureReads() {
  const { books, fetchBooks, updateBook, deleteBook, isUpdateModalOpen, setIsUpdateModalOpen, handleUpdateButtonClick } =
    useOutletContext<ContextType>();

  useEffect(() => {
    fetchBooks("future");
  }, []);

  if (books === null) {
    return;
  }

  return (
    <>
      <div>
      <h1 id="future-h1">Upcoming Adventures</h1>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            updateBook={updateBook}
            deleteBook={deleteBook}
            selectedBook={book}
            isUpdateModalOpen={isUpdateModalOpen}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            handleUpdateButtonClick={handleUpdateButtonClick}
          />
        ))}
      </div>
    </>
  );
}
