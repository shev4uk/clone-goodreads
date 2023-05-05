import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOK, UPDATE_BOOK } from "../graphql/mutations";
import AlertError from "../components/AlertError";

function Books() {
  const { id } = useParams();
  const [type, setType] = useState("");
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id },
    onCompleted: (data) => {
      setType(data.book.type);
    },
  });
  const [updateBook] = useMutation(UPDATE_BOOK);

  const handleCollectionChange = (event) => {
    setType(event.target.value);
    updateBook({ variables: { id: data.book.id, type: event.target.value } });
  };
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Book
      </h2>
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <AlertError error={error} />
        {data && (
          <div className="p-5 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.book.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              Author: {data.book.author}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              Date: {data.book.date}
            </p>
            {/* <img src={data.book.coverImage} alt={data.book.title} /> */}
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">Collection: {data.book.type}</p>
            <select value={type} onChange={handleCollectionChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="Want to read">Want to read</option>
              <option value="Reading">Reading</option>
              <option value="Read">Read</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
}

export default Books;
