// CountryDropdown.jsx

import React, { useState, useEffect } from "react";
import "./styles/CountryDropdown.css"; // Import the CSS file for styling

const CountryDropdown = ({ setZone }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="dropdown">
      {/* <button>Choose Country</button> */}
      <select className="country-dropdown">
        <option >Choose Country</option>
        {countries.map((country, index) => (
          <option
            key={index}
            onClick={() => {
              setZone(country);
            }}
          >
            {country.split("/")[1]}
          </option>
        ))}
     </select>
    </div>
  );
};

export default CountryDropdown;
