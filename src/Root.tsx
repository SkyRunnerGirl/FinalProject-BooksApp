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

  //Ensures the update button on each card does 2 things:
  //1) set the selectedBook to the book that the update button is a part of
  //2) opens the update modal form
  const handleUpdateButtonClick = (bookId: number) => {
    console.log('handleUpdateButton',bookId)
    setSelectedBookId(bookId);
    setIsUpdateModalOpen(true);
  };

  //Gets the books from the API, in this case the db.json file using json server.
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

  //Creates and adds a new book to the appropriate array in the db.json file.
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
    //Creates the new book object with the values from the add book form
    //and creates a new random ID that stays with it.
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
    //Sets the appropriate book array with the new book.
    setBooks([newBook, ...books]);
  };

  const updateBook = async (
    bookId: number,
    updatedData: Omit<Book, "id">,
    bookType: string
  ) => {
    //Fetches the book object that has been selected to update.
    try {
      const response = await fetch(`http://localhost:3000/${bookType}/${bookId}`);
      const bookToUpdate = await response.json();

    //Checks if the status is changed from the original based on the updated input,
    //if it is changed, performs a delete from old array and adds an updated
    // book object to new array.
    if (updatedData.status !== bookType) {
      await fetch(`http://localhost:3000/${bookType}/${bookId}`, 
        {
        method: "DELETE",
      });
      //creates an updated book by merging the original data with the updated data
      //and adds it to the new array.
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
        //Gets data from both original array and new array to show updates to both.
        fetchBooks(updatedData.status)
        fetchBooks(bookType)
        
        console.log("Updated Book moved and updated successfully!");
      //If status has not changed, then just updates the book object and leaves
      //in original array.
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

  //Deletes the book that the "delete" button was selected.
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

  //This returns all the elements that can be used throughout the app.
  //The Navigation ensures the NavBar is on all pages.
  //The Outlet is used in each page (children) as a way to switch between them using
  //front-side (client-side) server.
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
