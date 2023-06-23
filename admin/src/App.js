import React, { Fragment } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import { Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import Sidebar from "./components/sidebar/Sidebar";
import UsersList from "./pages/users/usersList/UsersList";
import User from "./pages/users/user/User";
import ProductsList from "./pages/products/productsList/ProductsList";
import Product from "./pages/products/product/Product";
import TimeAgo from "javascript-time-ago";
import he from "javascript-time-ago/locale/he.json";
import "./app.scss";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner/Spinner";
TimeAgo.addLocale(he);

function App() {
  const { currentUser, isFetching } = useSelector((state) => state.auth);

  return (
    <>
      {!currentUser || currentUser.role !== 'admin' ? (
        <Login />
      ) : (
        <Fragment>
          {isFetching && (
            <div className="spinnerContainer">
              <Spinner />
            </div>
          )}
          <div className="app">
            <Sidebar />
            <Routes>
              <Route path="/">
                <Route index path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<User />} />
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="צור משתמש חדש" />}
                  />
                </Route>
                <Route path="products">
                  <Route index element={<ProductsList />} />
                  <Route path=":productId" element={<Product />} />
                  <Route
                    path="new"
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </Fragment>
      )}
    </>
  );
}

export default App;
