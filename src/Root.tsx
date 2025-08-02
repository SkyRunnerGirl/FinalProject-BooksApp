import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useState } from "react";
import type { Book } from "./types";
import RandomIdGenertor from "./components/RandomIdGenerator";

export default function Root() {
  const [errorMessage, setErrorMessage] = useState(" ");
  const [books, setBooks] = useState({});

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<null | number>(null);

  const handleUpdateButtonClick = (bookId: number) => {
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
    setBooks(`[${newBook}, ...${status}]`);
  };

  const updateBook = async (
    bookId: number,
    updatedData: Omit<Book, "id">,
    bookType: string
  ) => {
    
    if (updatedData.status !== bookType) {
      fetch(`http://localhost:3000/${bookType}/${bookId}`, 
        {
        method: "DELETE",
      })
      
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete object.");
        return fetch(`http://localhost:3000/${updatedData.status}/${bookId}`, 
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });
        })
        
        //Do I need to setBooks here if I change the array
        fetchBooks(updatedData.status)
        fetchBooks(bookType)
        
        .then((response) => {
          if (!response.ok)
            throw new Error("Failed to add object to new array");
          return response.json();
        });
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
  };

  const deleteBook = async (bookId: number, bookType: string) => {
    try {
      await fetch(`http://localhost:3000/${bookType}/${bookId}`, {
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
