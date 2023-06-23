import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deleteProduct } from "../../redux/apiCalls/product";
import { deleteUser } from "../../redux/apiCalls/user";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./datatable.scss";

const Datatable = (props) => {
  const [data, setData] = useState(props.dataList);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
    if (props.path === "products") {
      deleteProduct(id, dispatch);
    } else deleteUser(id, dispatch);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "פעולות",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${props.path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">עוד</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              מחק
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        הוסף משתמש חדש
        <Link to="/users/new" className="link">
          צור משתמש 
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={props.dataList || 0}
        getRowId={(row) => row?._id || 0}
        columns={props.columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
