import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import AddPost from './components/AddPost';
import UpdatePost from './components/UpdatePost';

function App() {
  return (
    <>
      <Navbar expand="lg" className="shadow-sm sticky-top">
        {/* Navbar content same as before */}
      </Navbar>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<UpdatePost />} />
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;