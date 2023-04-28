import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import Button from "../button/Button";

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
  -webkit-appearance: none;
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
  const [selectedCity, setSelectedCity] = useState('');
  const [streets, setStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
  const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
  const api_url = "https://data.gov.il/api/3/action/datastore_search";
  const limit = 32000;
  const city_name_key = "שם_ישוב";
 const street_name_key = "שם_רחוב";

 useEffect(() => {
  const fetchCities = async () => {
    try {
      const response = await axios.get(api_url, {
        params: { resource_id: cities_resource_id, q: undefined, limit },
        responseType: "json"
      });
      setCities(response?.data?.result?.records);
    } catch (error) {
      console.error(error);
    }
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
    // navigate(`${location.pathname}?type=${filterType}?&details.electric=${filterElectric}?&location.city=${filterCity}`)
  };

  const handleCategort = (e) => {
    if (e.target.value === "null") {
      setFilterType(null);
    } else {
      setFilterType(e.target.value);
    }
  };

  const handleCity = (e) => {
    setFilterCity(e.target.value)
  };

  return (
      <FilterContainer>
        <Form onSubmit={handleClick}>
          <Button theme="sort" type='submit' text="סנן" />
          <Row>
            <ItemTitle>עיר</ItemTitle>
            {/* <Select name="date" defaultValue={null} onChange={handleCity}> */}
              <Input list="cities-data" name="city-choice" onChange={handleCity}/>
       <Datalist id="cities-data">
       <Option value="הכל"/>
         {cities.map((city, key) => {
        return  <Option key={key} value={city[city_name_key]} />
      })}
    </Datalist>
            {/* </Select> */}
          </Row>
          <Row>
            <ItemTitle>קטגוריה</ItemTitle>
            <Select name="type" defaultValue={null} onChange={handleCategort}>
              <Option defaultChecked value="null">הכל</Option>
              <Option value="bicycle">אופניים</Option>
              <Option value="scooter">קורקינט</Option>
            </Select>
          </Row>
        </Form>
      </FilterContainer>
  );
};

export default Filtering;
