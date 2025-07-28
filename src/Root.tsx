import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useState } from "react";
import type { Book } from "./types";
import BookCard from "./components/BookCard";

export default function Root() {
  const [errorMessage, setErrorMessage] = useState(" ");
  const [books, setBooks] = useState({});
  const [selectedBookId, setSelectedBookId] = useState<null | number>(null);
  
//HOW DO I CREATE A SELECTEDBOOK VARIABLE USING SELECTEDBOOKID WHEN I DON'T KNOW WHICH ARRAY IT WILL BE IN??
//THE STATUS PROPERTY HOLDS THE ARRAY VALUE THE ITEM WILL BE STORED IN AT ANY GIVEN TIME.

  const fetchBooks = async (bookType: string) => {
    try {
      const response = await fetch(`http://localhost:3000/${bookType}`);
      if (!response.ok) {
        setErrorMessage(response.statusText);
      } else {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const addNewBook = async (bookData: Omit<Book, "id">, bookType: string) => {
    try {
        const response = await fetch(`http://localhost:3000/${bookType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({bookData}),
      });

      if (!response.ok) {
        setErrorMessage(response.statusText);
      }

      const result = await response.json();
      return result
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
    const newBook = {
      //id: ,
      title: bookData.title,
      author: bookData.author,
      series: bookData.series,
      rating: bookData.rating,
      review: bookData.review,
      image: bookData.image,
      status: bookData.status
    }
    setBooks(`[newBook, ...${bookType}]`) //Is this correct usage of the backticks for temperal literals??
   
    fetchBooks(bookType);
    };

  const updateBook = async (bookId: number, updatedData: Omit<Book, "id">, bookType: string) => {
    try {
      const response = await fetch(`http://localhost:3000/${bookType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        setErrorMessage(response.statusText);
      }

      const result = await response.json();
      return result

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }

    //DO I NEED TO PARSE OUT UPDATEDDATA TO PROPERTY AND NEWVALUE ELEMENTS????
    setBooks(`current${bookType} => current${bookType}.map( book => ( book.id !== ${bookId} ? book : {...book, ${updatedData} ))`);
    fetchBooks(bookType);
  };

  const deleteBook = async (bookId: number, bookType: string) => {
    try {
      fetch(`http://localhost:3000/${bookType}`, {
        method: "DELETE",
      });

      if (!Response.ok) {
        setErrorMessage(Response.statusText);
      }

      setBooks(`${bookType}.filter(book => book.id !== ${bookId})`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
    fetchBooks (bookType);
  };

  return (
    <>
      <Navigation 
        addNewBook={addNewBook}
      />
      <Outlet
        context={{
          fetchBooks,
          books,
          errorMessage,
        }}
      />
      <BookCard 
        book={books}
        selectedBook={selectedBook}
        updateBook={updateBook}
        deleteBook={deleteBook}
      />
    </>
  );
}
