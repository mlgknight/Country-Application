import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./components/Search";
import DisplayCountries from "./components/DisplayCountries";
import HomePage from "./components/HomePage";
import SingleCountry from "./components/SingleCountry";

function App() {
  const [selectCountry, setSelectCountry] = useState("");
  const [currentCountry, setCurrentCountry] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.log('Error: Data not found');
        } else {
          console.log('An error occurred:', error.message);
        }
      });
  }, []);

  const filteredCountries = data.filter(country => country.name.common.toLowerCase()
    .includes(selectCountry.toLowerCase())).slice(0, 5);

  console.log(filteredCountries);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={(
          <div>
            <Search
              selectCountry={selectCountry}
              setSelectCountry={setSelectCountry}
              filteredCountries={filteredCountries}
              setCurrentCountry={setCurrentCountry}
            />
            {filteredCountries.length > 0 ? (
              <DisplayCountries
                currentCountry={currentCountry}
                setCurrentCountry={setCurrentCountry}
                filteredCountries={filteredCountries}
                selectCountry={selectCountry}
              />
            ) : (
              <p>No countries found</p>
            )}
          </div>
        )} />
        <Route path="/country" element={
          <SingleCountry 
            filteredCountries={filteredCountries} 
            selectCountry={selectCountry} 
            currentCountry={currentCountry} 
            setCurrentCountry={setCurrentCountry} 
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;
