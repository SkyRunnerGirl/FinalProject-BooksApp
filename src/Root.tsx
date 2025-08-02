import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useState } from "react";
import type { Book } from "./types";
import RandomIdGenertor from "./components/RandomIdGenerator";

export default function Root() {
  const [errorMessage, setErrorMessage] = useState(" ");
  const [books, setBooks] = useState<Book[]>([]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<null | number>(null);

  const handleUpdateButtonClick = (bookId: number) => {
    console.log('handleUpdateButton',bookId)
    setSelectedBookId(bookId);
    setIsUpdateModalOpen(true);
  };

  const fetchBooks = async (bookType: string) => {
    try {
      const response = await fetch(`http://localhost:3000/${bookType}`);
      if (!response.ok) {
        setErrorMessage(response.statusText);
      } else {
        const data = await response.json();
        setBooks(data);
        return data;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const addNewBook = async (
    title: string,
    author: string,
    series: string,
    rating: number,
    review: string,
    image: string,
    status: string
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/${status}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          series,
          rating,
          review,
          image,
          status,
        }),
      });

      fetchBooks(status);

      if (!response.ok) {
        setErrorMessage(response.statusText);
      }

      const result = await response.json();
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
    const newBook = {
      id: RandomIdGenertor(12, 10000),
      title: title,
      author: author,
      series: series,
      rating: rating,
      review: review,
      image: image,
      status: status,
    };
    setBooks([newBook, ...books]);
  };

  const updateBook = async (
    bookId: number,
    updatedData: Omit<Book, "id">,
    bookType: string
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/${bookType}/${bookId}`);
      const bookToUpdate = await response.json();

    if (updatedData.status !== bookType) {
      await fetch(`http://localhost:3000/${bookType}/${bookId}`, 
        {
        method: "DELETE",
      });
      
      const updatedBook = { ...bookToUpdate, ...updatedData};
      await fetch(`http://localhost:3000/${updatedData.status}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      );
        
        //Do I need to setBooks here if I change the array???
        fetchBooks(updatedData.status)
        fetchBooks(bookType)
        
        console.log("Updated Book moved and updated successfully!");
    } else {
      try {
        const response = await fetch(
          `http://localhost:3000/${bookType}/${bookId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        fetchBooks(bookType);

        if (!response.ok) {
          setErrorMessage(response.statusText);
        }

        const result = await response.json();
        return result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    }
    } catch (error) {
      console.log("Error updating Book: ", error);
    }
  };

  const deleteBook = async (bookId: number, bookType: string) => {
    try {
      const response = await fetch(`http://localhost:3000/${bookType}/${bookId}`, {
        method: "DELETE",
      });
      
      fetchBooks(bookType);

      if (!response.ok) {
        setErrorMessage(response.statusText);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <Navigation addNewBook={addNewBook} />
      <Outlet
        context={{
          fetchBooks,
          books,
          errorMessage,
          updateBook,
          deleteBook,
          selectedBookId,
          isUpdateModalOpen,
          setIsUpdateModalOpen,
          handleUpdateButtonClick,
        }}
      />
    </>
  );
}
