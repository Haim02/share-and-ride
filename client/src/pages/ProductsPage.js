import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px;
  padding: 20px;
  @media (max-width: 640px) {
    margin: 5;
    padding: 0;
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
  const limit = 5;
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filtering, setFiltering] = useState({});
  const [sorting, setSorting] = useState();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    getAllProducts(dispatch, currentPage, limit, filtering, sorting);
  }, [dispatch, currentPage, filtering, sorting]);

  const getFilter = (filters) => {
    setFiltering(filters);
   
  };

  const getSort = (sort) => {
    console.log(sort)
    setSorting(sort);
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

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      <Container>
        <FilterContainer>
          <Filtering getFilter={getFilter} />
        </FilterContainer>
        <SortContainer>
          <Sorting getSort={getSort} />
        </SortContainer>
        <ProductsContainer>
          {loading && <LoadingSpinner />}
          {products.length === 0 && <h1>אין תוצאות</h1>}
          {products.map((product) => {
            return <RidingToll key={product._id} product={product} />;
          })}
        </ProductsContainer>
        <Pagination>
          <button onClick={prePage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {currentPage}
          <button onClick={nextPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </Pagination>
      </Container>
    </Fragment>
  );
};

export default ProductsPage;
