import { useState, type ChangeEvent, type MouseEvent } from "react";

type AddFormProps = {
  addNewBook?: (
    title: string,
    author: string,
    series: string,
    rating: number,
    review: string,
    image: string,
    status: string
  ) => void;
  handleAddBookModalClose: () => void;
};

//Form that gathers all the information for creating a new book.
//Uses the addNewBook and handleAddBookModalClose from the Root.jsx file.
export default function AddBookForm({
  addNewBook,
  handleAddBookModalClose,
}: AddFormProps) {
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    series: "",
    rating: 0,
    review: "",
    image: "",
    status: "",
  });

  //Gathers all the changes and handles them as one.
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    //Sets the values for each object property to the input provided.
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });

  //Submits the form and calls the addNewBook function to create the new book with form values.
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (addNewBook) {
      addNewBook(
        formValues.title,
        formValues.author,
        formValues.series,
        formValues.rating,
        formValues.review,
        formValues.image,
        formValues.status
      );
    }
    //Closes the modal after hitting the submit button.
    handleAddBookModalClose();
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
          onClick={handleAddBookModalClose}
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
