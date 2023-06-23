import React, { useEffect } from "react";
import Datatable from "../../../components/datatable/Datatable";
import { userColumns } from "../../../datatablesource.js";
import { getUsers } from "../../../redux/apiCalls/user";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./../../../components/spinner/Spinner";
import "./usersList.scss";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, isFetching } = useSelector((state) => state.user);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  return (
    <div className="list">
      {isFetching ? (
        <div className="spinnerContainer">
          <Spinner />
        </div>
      ) : (
        <div className="listContainer">
          {users && <Datatable columns={userColumns} dataList={users} path="users" />}
        </div>
      )}
    </div>
  );
};

export default UsersList;
