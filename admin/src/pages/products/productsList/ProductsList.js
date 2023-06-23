import React, { useEffect } from "react";
import Datatable from "../../../components/datatable/Datatable";
import { productColumns } from "../../../datatablesource.js";
import { getProducts } from "../../../redux/apiCalls/product";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/spinner/Spinner";
import "./productsList.scss";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, isFetching } = useSelector((state) => state.product);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <div className="list">
      {isFetching ? (
        <div className="spinnerContainer">
          <Spinner />
        </div>
      ) : (
        <div className="listContainer">
          {products && <Datatable
            columns={productColumns}
            dataList={products}
            path="products"
          />}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
