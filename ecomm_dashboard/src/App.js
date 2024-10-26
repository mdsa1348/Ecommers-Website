import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Pages from './pages/Page';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import UpdateProduct from './pages/UpdateProduct';
import DeleteProduct from './pages/DeleteProduct';
import ProductDetails from './pages/ProductDetails';
import MyCarousel from './pages/home/Carousel';


import "./App.css";

function App() {
  // Check if user data is present in local storage
  const userData = JSON.parse(localStorage.getItem('user-info')); // Adjust the key according to your setup
  const isAuthenticated = userData !== null;

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route
              path="Login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="Register"
              element={isAuthenticated ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="Home"
              element={ <Home/>}
            />
            <Route
              path="Pages"
              element={isAuthenticated ? <Pages /> : <Navigate to="/Login" />}
            />
            <Route
              path="ProductList"
              element={isAuthenticated ? <ProductList /> : <Navigate to="/Login" />}
            />
            <Route
              path="ProductList/:id"
              element={isAuthenticated ? <ProductDetails /> : <Navigate to="/Login" />}
            />
            <Route
              path="MyCarousel"
              element={isAuthenticated ? <MyCarousel /> : <Navigate to="/Login" />}
            />
            <Route
              path="AddProduct"
              element={isAuthenticated ? <AddProduct /> : <Navigate to="/Login" />}
            />
            <Route
              path="UpdateProduct/:id"
              element={isAuthenticated ? <UpdateProduct /> : <Navigate to="/Login" />}
            />
            <Route
              path="DeleteProduct"
              element={isAuthenticated ? <DeleteProduct /> : <Navigate to="/Login" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
