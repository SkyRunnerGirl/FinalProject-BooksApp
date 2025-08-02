import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import BookCard from "../components/BookCard";
import type { Book } from "../types";

type ContextType = {
  books: Book[];
  fetchBooks: (bookType: string) => void;
  updateBook: (
    bookId: number,
    updatedData: Omit<Book, "id">,
    bookType: string
  ) => void;
  deleteBook: (bookId: number, bookType: string) => void;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (newValue: boolean) => void;
  handleUpdateButtonClick: (bookId: number) => void;
  selectedBookId: number
};

export default function Current() {
  const {
    books,
    fetchBooks,
    updateBook,
    deleteBook,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    handleUpdateButtonClick,
    selectedBookId,
  } = useOutletContext<ContextType>();

  useEffect(() => {
    fetchBooks("current");
  }, [fetchBooks]);

  if (books === null) {
    return;
  }
  const selectedBook = books.find((book) => book.id === selectedBookId);

  return (
    <>
      <div>
        <h1 id="current-h1">Current Adventure</h1>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            updateBook={updateBook}
            deleteBook={deleteBook}
            selectedBook={selectedBook}
            isUpdateModalOpen={isUpdateModalOpen}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            handleUpdateButtonClick={handleUpdateButtonClick}
          />
        ))}
      </div>
    </>
  );
}
