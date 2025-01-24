import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SingleCountry({ filteredCountries, selectCountry, currentCountry, setCurrentCountry }) {
  const [countryWeather, setCountryWeather] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (city) {
      axios
        .get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then(response => {
          setCountryWeather(response.data);
        })
        .catch(error => alert("Cannot access data", error));
    }
  }, [city, apiKey]);

  useEffect(() => {
    if (currentCountry) {
      setCity(`${currentCountry.capital}, ${currentCountry.cca2}`);
    }
  }, [currentCountry]);

  useEffect(() => {
    if (countryWeather && countryWeather.length > 0) {
      const location = countryWeather[0];
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => alert("Cannot fetch weather data", error));
    }
  }, [countryWeather, apiKey]);

  const handleCountryData = country => {
    setCurrentCountry(country);
  };

  if (filteredCountries.length === 1) {
    const country = {
      name: filteredCountries[0].name.common,
      capital: filteredCountries[0].capital,
      area: filteredCountries[0].area,
      languages: Object.values(filteredCountries[0].languages).join(", "),
      flag: filteredCountries[0].flags.png
    };
    return (
      <div className="country-details">
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>Languages: {country.languages}</p>
        <img src={country.flag} alt={`${country.name} flag`} />
        {weatherData && (
          <div className="weather-details">
            <p>Temperature: {weatherData.main.temp} °F</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <p>Wind: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {currentCountry ? (
        <div className="country-details">
          <h1>{currentCountry.name.common}</h1>
          <p>Capital: {currentCountry.capital}</p>
          <p>Area: {currentCountry.area}</p>
          <p>Languages: {Object.values(currentCountry.languages).join(", ")}</p>
          <img src={currentCountry.flags.png} alt={`${currentCountry.name.common} flag`} />
          {weatherData && (
            <div className="weather-details">
              <h2>Weather in {currentCountry.capital}</h2>
              <p>Temperature: {weatherData.main.temp} °F</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <img className="weather-img" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
              <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>
          )}
        </div>
      ) : (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {selectCountry.length === 0 ? null : country.name.common}
              {selectCountry.length === 0 ? null : (
                <button onClick={() => handleCountryData(country)}>View More</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
