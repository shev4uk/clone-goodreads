import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKS } from "../graphql/mutations";
import AlertError from "../components/AlertError";

const AddBook = () => {
  const [state, setState] = useState({
    author: "",
    title: "",
    type: "",
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }
  const [addBook, { loading, error }] = useMutation(CREATE_BOOKS, {
    onCompleted: (data) => {
      navigate("/books", { replace: true });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addBook({
      variables: {
        input: {
          ...state,
          date: new Date().toString(),
        }
      },
    });
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add book
      </h2>
      <AlertError error={error} />
      <form onSubmit={handleFormSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="author"
            value={state.author}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewUrl && <img src={previewUrl} width="300" alt="Preview" />}
        </div> */}
        <div className="mb-6">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Collection
          </label>
          <select
            value={state.type}
            name="type"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value=""></option>
            <option value="Want to read">Want to read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;
