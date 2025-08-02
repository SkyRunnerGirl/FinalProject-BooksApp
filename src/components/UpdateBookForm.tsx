import { useState, type ChangeEvent, type MouseEvent } from "react";
import type { Book } from "../types";

type UpdateBookFormProps = {
  selectedBook: Book | undefined;
  handleUpdateBookClose: () => void;
  updateBook: (
    bookId: number,
    updatedData: Omit<Book, "id">,
    bookType: string
  ) => void;
};

export default function UpdateBookForm({
  selectedBook,
  handleUpdateBookClose,
  updateBook,
}: UpdateBookFormProps) {
  const [formValues, setFormValues] = useState({
    title: selectedBook?.title || "",
    author: selectedBook?.author || "",
    series: selectedBook?.series || "",
    rating: selectedBook?.rating || "",
    review: selectedBook?.review || "",
    image: selectedBook?.image || "",
    status: selectedBook?.status || "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedBook) {
      return;
    }

    updateBook(selectedBook.id, formValues, selectedBook.status);

    handleUpdateBookClose();
  };

  return (
    <form>
      <div className="mb-2">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="form-control"
          name="title"
          onChange={handleChange}
          value={formValues.title}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          id="author"
          type="text"
          className="form-control"
          name="author"
          onChange={handleChange}
          value={formValues.author}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="series" className="form-label">
          Series
        </label>
        <input
          id="series"
          type="text"
          className="form-control"
          name="series"
          onChange={handleChange}
          value={formValues.series}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <input
          id="rating"
          type="text"
          className="form-control"
          name="rating"
          onChange={handleChange}
          value={formValues.rating}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="review" className="form-label">
          Review
        </label>
        <input
          id="review"
          type="text"
          className="form-control"
          name="review"
          onChange={handleChange}
          value={formValues.review}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="image" className="form-label">
          Book Image URL
        </label>
        <input
          id="image"
          type="text"
          className="form-control"
          name="image"
          onChange={handleChange}
          value={formValues.image}
        />
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          className="form-select"
          name="status"
          onChange={handleChange}
          value={formValues.status}
        >
          <option value="">Status</option>
          <option value="current">current</option>
          <option value="future">future</option>
          <option value="finished">finished</option>
        </select>
      </div>
      <div className="text-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={handleUpdateBookClose}
        >
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  );
}
