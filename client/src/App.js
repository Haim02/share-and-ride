import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import Product from "./pages/Product";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProductsPage from "./pages/ProductsPage";
import UploadProductPage from "./pages/UploadProductPage";
import ProfilePage from "./pages/ProfilePage";
import UserProduct from "./components/profile/UserProduct";
import ForgotPasswordPage from "./containers/auth/ForgotPasswordPage";
import ResetPasswordPage from "./containers/auth/ResetPasswordPage";
import MyRequests from "./components/profile/request/MyRequests";
import MessagesList from "./components/profile/messages/MessagesList";
import UpdatePassword from "./components/profile/request/UpdatePassword";
import PageNotFound from "./pages/PageNotFound";
import TimeAgo from "javascript-time-ago";
import he from "javascript-time-ago/locale/he.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
TimeAgo.addLocale(he);

function App() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={currentUser ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/Register"
          element={currentUser ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          path="/forgotPassword"
          element={
            currentUser ? <Navigate replace to="/" /> : <ForgotPasswordPage />
          }
        />
        <Route
          path="/api/user/resetPassword/:token"
          element={
            currentUser ? <Navigate replace to="/" /> : <ResetPasswordPage />
          }
        />
        <Route path="/uploadProduct" element={<UploadProductPage />} />
        {currentUser && (
          <Route path="/profile/:id">
            <Route index element={<ProfilePage />} />
            <Route path="userProduct" element={<UserProduct />} />
            <Route path="userPassword" element={<UpdatePassword />} />
            <Route path="myRequests" element={<MyRequests />} />
            <Route path="messages" element={<MessagesList />} />
          </Route>
        )}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
