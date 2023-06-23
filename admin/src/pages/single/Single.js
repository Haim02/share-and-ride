import React, { useEffect } from "react";
import { getOneUder } from "../../redux/apiCalls/user";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import "./single.scss";

const Single = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    getOneUder(dispatch, userId);
  }, [dispatch, userId]);

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">מידע</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">אימייל:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">טלפון:</span>
                  <span className="itemValue">{user?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">כתובת:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">עיר:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">השכרות אחרונות</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
