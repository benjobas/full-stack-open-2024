import React, { useState, useEffect } from 'react';
import countryService from './services/countryService';
import weatherService from './services/weatherService';
import Search from './components/Search';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAllCountries()
      .then(initialCountries => {
        setCountries(initialCountries);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [query, countries]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0];
      weatherService.getCityCoordinates(capital)
        .then(coords => {
          return weatherService.getWeather(coords.lat, coords.lon);
        })
        .then(weatherData => {
          setWeather(weatherData);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    } else {
      setWeather(null);
    }
  }, [filteredCountries]);

  return (
    <div>
      <Search onSearch={setQuery} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h3>{filteredCountries[0].name.common}</h3>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area} km²</p>
          <img
            src={filteredCountries[0].flags.png}
            alt={`Flag of ${filteredCountries[0].name.common}`}
            width="100"
          />
          <p>Languages: {Object.values(filteredCountries[0].languages).join(', ')}</p>
          {weather && (
            <div>
              <h4>Weather in {filteredCountries[0].capital}</h4>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          )}
        </div>
      ) : (
        filteredCountries.map((country) => (
          <p key={country.cca3}>{country.name.common}</p>
        ))
      )}
    </div>
  );
};

export default App;
