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
      <button>Choose Country</button>
      <div className="dropdown-content">
        {countries.map((country, index) => (
          <div
            key={index}
            onClick={() => {
              setZone(country);
            }}
          >
            {country.split("/")[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryDropdown;
