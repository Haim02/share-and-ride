import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import RidingToll from "../components/productCart/ProductCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sorting from "../components/filters/Sorting";
import Filtering from "./../components/filters/Filtering";
import { getAllProducts } from "../redux/apiCalls/products";
import { useSelector, useDispatch } from "react-redux";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import LoadingSpinner from "./../components/UI/LoadingSpinner";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px;
  padding: 20px;
  @media (max-width: 640px) {
    margin-top: 50px;
  }
`;
const FilterContainer = styled.div`
  width: 60%;
  @media (max-width: 640px) {
    width: 90%;
  }
`;
const SortContainer = styled.div`
  margin-left: auto;
  margin-right: 50px;
`;

const ProductsContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Pagination = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    text-decoration: none;
    color: black;
    padding: 0.5px;
    border: 1px solid green;
    margin: 0 1rem;
  }
`;

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [filtering, setFiltering] = useState({});
  const [sorting, setSorting] = useState();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const type = searchParams.get("type");

  useEffect(() => {
    if (type) {
      filtering.type = type;
      navigate("/products");
    }

    getAllProducts(dispatch, currentPage, limit, filtering, sorting);
  }, [
    dispatch,
    currentPage,
    filtering,
    sorting,
    setFiltering,
    setSorting,
    type,
    navigate,
  ]);

  const getFilter = (filters) => {
    setFiltering(filters);
  };

  const nextPage = () => {
    setCurrentPage((pre) => pre + 1);
  };

  const prePage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((pre) => pre - 1);
  };

  const reset = () => {
    setFiltering({});
    setSorting();
  };

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      <Container>
        <FilterContainer>
          <Filtering getFilter={getFilter} />
        </FilterContainer>
        <SortContainer>
          <Sorting getSort={(sort) => setSorting(sort)} />
          <div>
            <button onClick={reset}>אפס מסננים</button>
          </div>
        </SortContainer>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProductsContainer>
            {products && products.length === 0 && <h1>אין תוצאות</h1>}
            {products &&
              products.map((product) => {
                return <RidingToll key={uuid()} product={product} />;
              })}
          </ProductsContainer>
        )}
        <Pagination>
          <button onClick={prePage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {currentPage}
          <button onClick={nextPage} disabled={!products}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </Pagination>
      </Container>
    </Fragment>
  );
};

export default ProductsPage;
