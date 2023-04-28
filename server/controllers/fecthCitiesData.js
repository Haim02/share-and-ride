// REST API URL
const api_url = "https://data.gov.il/api/3/action/datastore_search";
// Cities endpoint
const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
// Streets endpoint
const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
// Field names
const city_name_key = "שם_ישוב";
const street_name_key = "שם_רחוב";
// dataset ids
const cities_data_id = "cities-data";
const streets_data_id = "streets-data";
const axios = require('axios');
// input elements
// const cities_input = document.getElementById("city-choice");
// const streets_input = document.getElementById("street-choice");

getData = async (resource_id, q = "", limit = "100") => {
    //console.log("sending", resource_id, query);
    return await fetch(api_url, {
      params: { resource_id, q, limit },
      responseType: "json"
    });
  };

// exports.populateDataList = (id, resource_id, field_name, query, limit) => {
const populateDataList = async(res, req) => {
    var data = {
        resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba', // the resource id
        limit: 5, // get 5 results
        q: 'jones' // query for 'jones'
      };
    try {
        const res = await axios.get({
            url: 'https://data.gov.il/api/3/action/datastore_search',
            data: data,
            dataType: 'jsonp',})

            res.status(200).json({
                res
            })
    } catch (error) {
        console.log(error)
         res.status(400).json({
                error
            })
    }
}
// exports.populateDataList = (res, req) => {
//     getData(cities_resource_id, undefined, 32000)
//       .then((response) => {
//           const names = response?.data?.result?.records;
//           console.log(names)
//         //   res.send(names)
//       }
//         // parseResponse(response?.data?.result?.records, field_name)
//       )
//     //   .then((html) => (datalist_element.innerHTML = html))
//       .catch((error) => {
//         // console.log("Couldn't get list for", cities_data_id, "query:", undefined, error);
//         console.log(error);
//       });
//   };

module.exports = populateDataList