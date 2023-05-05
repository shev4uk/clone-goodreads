import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/mutations";

function Books() {
  const { data } = useQuery(GET_BOOKS);
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Books
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2 mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      {data &&
        data.books.map((book) => (
          <div
            key={book.id}
            className="mb-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={book.id}>
              <img
                className="rounded-t-lg"
                src="/docs/images/blog/image-1.jpg"
                alt=""
              />
            </Link>
            <div className="p-5">
              <Link to={book.id}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {book.title}
                </h5>
              </Link>
              <Link
                to={book.id}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
        </div>
    </>
  );
}

export default Books;
