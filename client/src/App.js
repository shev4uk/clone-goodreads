import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Book from './pages/Book';
import Layout from './pages/Layout';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="books" replace  />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/books" element={<Layout />} >
            <Route index element={<Books />} />
            <Route path="add" element={<AddBook />} />
            <Route path=":id" element={<Book />} />
          </Route>
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};


export default App;
