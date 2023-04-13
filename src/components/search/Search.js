import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2608a56266msh7c7afc0d4be4745p188ec4jsnc98c8fdbf3af",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
