// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from 'styled-components';
// import Button from './../button/Button';


// const Form = styled.div`
//       margin-top: 2em;
// `;
// const Container = styled.div`
//      padding: 0.5em 2em;
// `;
// const Label = styled.label``;
// const Input = styled.input`
//     width: 10%;
// `;
// const Datalist = styled.datalist``;
// const Option = styled.option``;

// const Btn = styled.div`
// display: flex;
// justify-self: flex-start;
// padding: 15px 0;
// padding-left: 20px;
// `


// const Local = (props) => {
//   const [cities, setCities] = useState([]);
//   const [streets, setStreets] = useState([]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedStreet, setSelectedStreet] = useState("");
//   const [houseNumber, setHouseNumber] = useState("");
//   const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
//   const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
//   const api_url = "https://data.gov.il/api/3/action/datastore_search";
//   const limit = 32000;
//   const city_name_key = "שם_ישוב";
//  const street_name_key = "שם_רחוב";

//   const fetchCities = async () => {
//     await axios.get(api_url, {
//       params: { resource_id: cities_resource_id, q: undefined, limit: 32000 },
//       responseType: "json"
//     })
//     .then((response) => {
//       const citiesName = response?.data?.result?.records.map((city) => {
//         return city[city_name_key].trim()
//       })
//       setCities(citiesName)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   };


//   useEffect(() => {
//     fetchCities()
//   }, []);

//   useEffect(() => {
//     if (selectedCity !== "") {
//       const fetchStreets = async () => {
//         await axios.get(api_url, {
//           params: { resource_id: streets_resource_id, 
//              q: selectedCity,
//            limit: 32000 },
//           responseType: "json"
//         })
//         .then((response) => {
//           const streetsName = response?.data?.result?.records.map((street) => {
//             return street[street_name_key].trim()
//           })
//             setStreets(streetsName)
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//       };
//       fetchStreets();
//     }
//   }, [selectedCity]);


//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//   };
  
//   const handleStreetChange = (e) => {
//     setSelectedStreet(e.target.value);
//   };

//   const handleHouseNumberChange = (e) => {
//     setHouseNumber(e.target.value)
//   };
  
//   const handleClick = () => {
//     // if(selectedCity === '' || selectedStreet === '' || houseNumber === '') {
//     //   return
//     // }
//     const address = {
//       city: selectedCity,
//       street: selectedStreet,
//       houseNumber: houseNumber
//     }
//     props.pasValue(address)
//   };

//   return (
//     <div>
// <Form >
// <Container >
//     <Label htmlFor="city-choice">בחר עיר:</Label>
//     <Input list="cities-data" name="city-choice" onChange={handleCityChange}/>
//     <Datalist id="cities-data">
//       <Option value="טוען רשימת ערים..."/>
//       {cities.map((city, key) => {
//         return  <Option key={key} value={city} />
//       })}
//        {/* {citiesList.map((record) => <Option value={record[city_name_key].trim()}/>)              
//          .join("\n") || ""} */}
//     </Datalist>
//   </Container> 


//      <Container >
//      <Label htmlFor="city-choice">בחר עיר:</Label>
//      <Input list="cities-data" name="city-choice" onChange={handleCityChange}/>
//      <Datalist id="cities-data">
//        <Option value="טוען רשימת ערים..."/>
//        {/* <Option /> */}
//        {cities.map((city, key) => {
//         return  <Option key={key} value={city} />
//       })}
//        {/* {citiesList.map((record) => <Option value={record[city_name_key].trim()}/>)              
//          .join("\n") || ""} */}
//     </Datalist>
//   </Container>
//   <Container >
//     <Label htmlFor="street-choice">בחר רחוב:</Label>
//     <Input disabled={selectedCity.length === 0} list="streets-data" id="street-choice" name="street-choice" onChange={handleStreetChange}/>
//     <Datalist id="streets-data">
//         {streets.map((street, key) => {
//             return <Option key={key} value={street} />
//         })}
//     </Datalist>
//   </Container>
//   <Container >
//     <Label htmlFor="street-choice">מספר בית:</Label>
//     <input disabled={selectedStreet.length === 0} type='number'  onChange={handleHouseNumberChange}/>
//   </Container>
//   <Btn>
//         <Button type='button' onClick={handleClick} text='המשך' />
//     </Btn>  
// </Form>
//     </div>
//   );
// };

// export default Local;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../button/Button';

const Form = styled.div`
      margin-top: 2em;
`;
const Container = styled.div`
     padding: 0.5em 2em;
     display: flex;
     flex-direction: row-reverse;
`;
const Label = styled.label`
  margin-left: 5px;
`;
const Input = styled.input`
    width: 30%;
    height: 30px;
    text-align: right;
    margin-right: 5px;
`;
const Datalist = styled.datalist`
   width: 50px;
   background-color: beige;
`;
const Option = styled.option`
   width: 50px;
`;

const Btn = styled.div`
display: flex;
justify-self: flex-start;
padding: 15px 0;
padding-left: 20px;
`

function CitiesAndStreets(props) {
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

  const handleCitySelect = async (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    try {
      const response = await axios.get(api_url, {
        params: { resource_id: streets_resource_id, q: selectedCity, limit },
        responseType: "json"
      });
      setStreets(response?.data?.result?.records);
    } catch (error) {
      console.error(error);
    }
  };
      
      const handleStreetChange = (e) => {
        setSelectedStreet(e.target.value);
      };
    
      const handleHouseNumberChange = (e) => {
        setHouseNumber(e.target.value)
      };

      const handleClick = () => {
            if(selectedCity === '' || selectedStreet === '' || houseNumber === '') {
              return
            }
            const address = {
              city: selectedCity,
              street: selectedStreet,
              houseNumber: houseNumber
            }
            console.log(address)
            props.pasValue(address)
          };

  return (
    <div>
   <Form >
   <Container >
       <Label htmlFor="city-choice">:בחר עיר</Label>
       <Input list="cities-data" name="city-choice" onChange={handleCitySelect}/>
       <Datalist id="cities-data">
         <Option value="טוען רשימת ערים..."/>
         {cities.map((city, key) => {
        return  <Option key={key} value={city[city_name_key]} />
      })}
    </Datalist>
  </Container> 
  <Container >
    <Label htmlFor="street-choice">:בחר רחוב</Label>
    <Input disabled={selectedCity.length === 0} list="streets-data" id="street-choice" name="street-choice" onChange={handleStreetChange}/>
    <Datalist id="streets-data">
        {streets.map((street, key) => {
            return <Option key={key} value={street[street_name_key]} />
        })}
    </Datalist>
  </Container>
  <Container >
    <Label htmlFor="street-choice">:מספר בית</Label>
    <input disabled={selectedStreet.length === 0} type='number'  onChange={handleHouseNumberChange}/>
  </Container>
  <Btn>
        <Button
          theme="uploadForm"
          type="button"
          onClick={handleClick}
          text="המשך"
        />
      </Btn>
</Form>
    </div>
  );
}

export default CitiesAndStreets;