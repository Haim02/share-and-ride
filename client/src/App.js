import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/Register";
import {
  useCheckTokenMutation,
  useLogoutMutation,
} from "./redux/apiCalls/auth";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import UploadProductPage from "./pages/UploadProduct";
import UserProduct from "./components/profile/UserProduct";
import UpdatePassword from "./components/profile/UpdatePassword";
import MyRequests from "./components/profile/request/MyRequests";
import MessagesList from "./components/profile/messages/MessagesList";
import Products from "./pages/Products";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import he from "javascript-time-ago/locale/he.json";
import TimeAgo from "javascript-time-ago";
import "react-toastify/dist/ReactToastify.css";
import { authAction } from "./redux/slices/auth";
import { messagesAction } from "./redux/slices/messages";
import { productAction } from "./redux/slices/products";
import LoadingSpinner from "./components/UI/LoadingSpinner";
TimeAgo.addLocale(he);
TimeAgo.addDefaultLocale(he);

function App() {
  const [logout, { isLoading }] = useLogoutMutation();
  const [checkToken] = useCheckTokenMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const userToken = { token };

    const checkUserToken = async () => {
      try {
        const res = await checkToken(userToken).unwrap();
      } catch (error) {
        if (
          error?.data?.error?.name === "TokenExpiredError" ||
          error?.data?.message === "NoToken"
        ) {
          await logout().unwrap();
          dispatch(authAction.logoutSuccess());
          dispatch(messagesAction.clearState());
          dispatch(productAction.clearState());
          if (!currentUser) {
            navigate("/");
          }
        }
      }
    };
    if (currentUser && token) {
      checkUserToken();
    }
    checkUserToken();
  }, [checkToken, token, currentUser, dispatch, logout, navigate]);

  return (
    <Fragment>
      <Navbar />
      {isLoading && <LoadingSpinner />}
      <ToastContainer />
      <Routes>
        <Route path="/" index element={<Home />} />
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
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/uploadProduct" element={<UploadProductPage />} />
        {currentUser && (
          <Route path="/profile/:id">
            <Route index element={<Profile />} />
            <Route path="userProduct" element={<UserProduct />} />
            <Route path="userPassword" element={<UpdatePassword />} />
            <Route path="myRequests" element={<MyRequests />} />
            <Route path="messages" element={<MessagesList />} />
          </Route>
        )}
        {/* <ErrorBoundary
        fallback={<PageNotFound />}
        onError={() => console.log('error happend!')}
        >
        <Route path="/product/:id" element={<Product />} />
        </ErrorBoundary> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
