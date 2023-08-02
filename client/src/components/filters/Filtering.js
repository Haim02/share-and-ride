import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "../button/Button";
import uuid from "react-uuid";

const FilterContainer = styled.section`
  padding: 20px 30px;
  min-height: 60px;
  width: 80%;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  text-align: right;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Input = styled.input`
  width: 60%;
  height: 35px;
  margin-left: auto;
  border: none;
  text-align: right;
`;
const Datalist = styled.datalist`
  width: 50px;
  background-color: beige;
`;

const Select = styled.select`
  border: none;
  outline: none;
  color: #848484;
  padding: 10px 20px;
  width: 100%;
  border-left: 1px solid #ccc;
  text-align: right;
`;
const ItemTitle = styled.label`
  margin-right: 10px;
`;
const Option = styled.option``;

const Filtering = (props) => {
  const [filterCity, setFilterCity] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [cities, setCities] = useState([]);
  const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
  const api_url = "https://data.gov.il/api/3/action/datastore_search";
  const limit = 32000;
  const city_name_key = "שם_ישוב";

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(api_url, {
          params: { resource_id: cities_resource_id, q: undefined, limit },
          responseType: "json",
        });
        setCities(response?.data?.result?.records);
      } catch (error) {}
    };
    fetchCities();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const filter = {
      city: filterCity,
      type: filterType,
    };
    props.getFilter(filter);
  };

  const handleCategort = (e) => {
    if (e.target.value === "null") {
      setFilterType(null);
    } else {
      setFilterType(e.target.value);
    }
  };

  const handleCity = (e) => {
    if (e.target.value === "null") {
      setFilterCity(null);
    } else {
      setFilterCity(e.target.value);
    }
  };
 
  return (
    <FilterContainer>
      <Form onSubmit={handleClick}>
        <Button theme="sort" type="submit" text="סנן" />
        <Row>
          <ItemTitle>עיר</ItemTitle>
          <Input list="cities-data" name="city-choice" onChange={handleCity} />
          <Datalist id="cities-data">
            <Option defaultChecked={"null"} value={"null"}>
              הכל
            </Option>
            {cities.map((city) => {
              return <Option key={uuid()} value={city[city_name_key]} />;
            })}
          </Datalist>
        </Row>
        <Row>
          <ItemTitle>קטגוריה</ItemTitle>
          <Select name="type" defaultValue={null} onChange={handleCategort}>
            <Option defaultChecked={"null"} value={"null"}>
              הכל
            </Option>
            <Option value="bicycle">אופניים</Option>
            <Option value="scooter">קורקינט</Option>
          </Select>
        </Row>
      </Form>
    </FilterContainer>
  );
};

export default Filtering;
