import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalProducts,
  getTotalUsers,
  getTodayRentStats,
  getLastProducts,
} from "../../redux/apiCalls/home";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import FeaturedTotal from "../../components/featuredTotal/FeaturedTotal";
import Table from "../../components/table/Table";
import Spinner from "./../../components/spinner/Spinner";
import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const arr = []
  const {
    totalUsers,
    totalProducts,
    todayRentStats,
    lastProducts,
    isFetching,
  } = useSelector((state) => state.home);

  useEffect(() => {
    getTotalProducts(dispatch);
    getTotalUsers(dispatch);
    getTodayRentStats(dispatch);
    getLastProducts(dispatch);
  }, [dispatch]);

  return (
    <div className="home">
      {isFetching ? (
        <div className="spinnerContainer">
          <Spinner />
        </div>
      ) : (
        <div className="homeContainer">
          <div className="widgets">
            <Widget type="user" count={totalUsers} />
            <Widget type="order" count={totalProducts} />
          </div>
          <div className="charts">
            {todayRentStats && <Featured value={todayRentStats || arr} /> }
            {todayRentStats && <FeaturedTotal value={todayRentStats || arr} /> }
          </div>
          <div className="listContainer">
            <div className="listTitle">מוצרים אחרונים שעלו</div>
            {lastProducts && <Table products={lastProducts} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
