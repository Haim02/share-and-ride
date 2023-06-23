import React, { useEffect, useState, Fragment } from "react";
import {
  getOneUser,
  updateUser,
  getUserLastRents,
} from "../../../redux/apiCalls/user";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../../components/chart/Chart";
import profileImage from "../../../assets/images/profileImage.jpg";
import LastRentTable from "./../../../components/lastRentTable/LastRentTable";
import Spinner from "../../../components/spinner/Spinner";
import ReactTimeAgo from "react-time-ago";
import "./user.scss";

const User = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [updateUserFilds, setUpdateUserFilds] = useState({});
  const userId = location.pathname.split("/")[2];
  const { user, isFetching, lastRents, isFetchingLastRents } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    getOneUser(dispatch, userId);
    getUserLastRents(userId, dispatch);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserFilds((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userId, updateUserFilds, dispatch);
  };

  if (user) {
    return (
      <div className="single">
        {isFetching ? (
          <div className="spinnerContainer">
            <Spinner />
          </div>
        ) : (
          <Fragment>
          <div className="singleContainer">
            <div className="top">
              <div className="left">
                <div className="editButton">Edit</div>
                <h1 className="title">מידע</h1>
                <div className="item">
                  <img
                    src={profileImage}
                    alt="profileImage"
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{user?.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">:אימייל</span>
                      <span className="itemValue">{user?.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">:טלפון</span>
                      <span className="itemValue">{user?.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">:נוצר לפני</span>
                      <span className="itemValue">
                        {
                          <ReactTimeAgo
                            date={new Date(user.createdAt)}
                            locale="he"
                          />
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart aspect={3 / 1} title="הוצאות אחרונות" />
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">עדכן משתמש</span>
              <form className="userUpdateForm" onSubmit={handleSubmit}>
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>שם</label>
                    <input
                      type="text"
                      placeholder={user.name}
                      className="userUpdateInput"
                      onChange={handleChange}
                      name="name"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>אימייל</label>
                    <input
                      type="text"
                      placeholder={user.email}
                      className="userUpdateInput"
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>פלאפון</label>
                    <input
                      type="text"
                      placeholder={user.phone}
                      className="userUpdateInput"
                      onChange={handleChange}
                      name="phone"
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <button className="userUpdateButton">עדכן</button>
                </div>
              </form>
            </div>
            <div className="bottom">
              <h1 className="title">השכרות אחרונות</h1>
              {isFetchingLastRents ? (
                <Spinner />
              ) : (
                <LastRentTable name="מוצר" type="user" rows={lastRents} />
              )}
            </div>
          </div>
          </Fragment>
        )}
      </div>
    );
  }
};

export default User;
