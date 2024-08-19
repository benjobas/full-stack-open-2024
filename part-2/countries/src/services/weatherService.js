import axios from 'axios';

const apiKey = import.meta.env.VITE_SOME_KEY;

const getCityCoordinates = (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  return axios.get(url).then(response => response.data[0]);
};

const getWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  return axios.get(url).then(response => response.data);
};

export default { getCityCoordinates, getWeather };