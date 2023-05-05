import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { AuthContext } from "../context/AuthContext";
import AlertError from "../components/AlertError";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.loginUser.token);
      setIsAuthenticated(true);
      navigate("/books", { replace: true });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    loginUser({
      variables: {
        input: { email, password },
      },
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login
      </h2>
      <AlertError error={error} />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
            No account? 
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
