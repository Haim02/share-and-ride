import React from "react";
import Datatable from "../../components/datatable/Datatable";
import "./list.scss";

const List = () => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
};

export default List;
