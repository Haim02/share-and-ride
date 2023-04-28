import React, { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "./redux/apiCalls/auth";
import styled from "styled-components";
import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import Product from "./pages/Product";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import RentFrom from "./components/rentForm/RentFrom";
import ProductsPage from "./pages/ProductsPage";
import UploadProductPage from "./pages/UploadProductPage";
import ProfilePage from "./pages/ProfilePage";
import { Token } from "@mui/icons-material";
import { authAction } from "./redux/slice/auth";
import User from "./components/profile/User";
import UserProduct from "./components/profile/UserProduct";
import SideNavProfile from "./components/profile/SideNavProfile";
import ForgotPasswordPage from "./containers/auth/ForgotPasswordPage";
import ResetPasswordPage from "./containers/auth/ResetPasswordPage";
import MyRequests from "./components/profile/request/MyRequests";
import Message from "./components/profile/messages/Message";
import MessagesList from "./components/profile/messages/MessagesList";
import UpdatePassword from "./components/profile/request/UpdatePassword";
import TimeAgo from "javascript-time-ago";
import he from "javascript-time-ago/locale/he.json";
TimeAgo.addDefaultLocale(he);

const SideBar = styled.div`
  flex: 1;
  margin-right: 3px;
`;
// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
// `

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await isLoggedIn()
  //     currentUser = user
  //     dispatch(authAction.loginSuccess(user))
  //     console.log("app", user)
  //   }
  //   getUser()
  // }, [dispatch])

  // console.log("appw", currentUser)

  return (
    <Fragment>
      {/* <RentFrom />  */}
      <Navbar />
      {/* <Product/> */}
      <Routes>
        {/* <Route path="/filter" element={<ProductsPage />} /> */}
        <Route path="/" element={<Home />} />
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
        {/* {currentUser && <Route path="/profile/:id" element={<ProfilePage />} >
              <Route path="userProduct" element={<UserProduct />} />
              <Route path="myRequests" element={<MyRequests />} />
              <Route path="message" element={<Message />} />
          </Route>} */}
        {/* {currentUser && <Route path="/profile/:id" element={<SideNavProfile />} >
          <Route index path="/profile/:id" element={<User />} />
          </Route>} */}
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
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </Fragment>
    // <AppContainer>
    // <Login />
    // <Register />
    // <Product />
    // <Home />
    // <ProductsList />
    // <SearchItem />
    // </AppContainer>
  );
}

export default App;
