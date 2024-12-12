import React, { useState } from 'react';
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiCloudy,
  WiFog,
  WiDayCloudy,
} from 'react-icons/wi';
import './weather.scss';
import axios from 'axios';
import { weatherAPI } from '../../api/api';

const Weather = ({ location, temperature }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState({});
  const [found, setFound] = useState(false);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    //console.log(searchTerm);
  };

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `${weatherAPI.base}/weather?q=${searchTerm}&units=metric&appid=${weatherAPI.key}`
      );
      console.log(res.data);
      setWeather(res.data);
      setFound(true);
    } catch (error) {
      console.error(error);
      setFound(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm) {
        fetchWeather();
      }
    }
  };
  const getWeatherIcon = (conditionCode) => {
    switch (conditionCode) {
      case '01d':
        return <WiDaySunny />;
      case '01n':
        return <WiDaySunny />;
      case '02d':
        return <WiDayCloudy />;
      case '02n':
        return <WiDayCloudy />;
      case '03d':
        return <WiCloudy />;
      case '03n':
        return <WiCloudy />;
      case '04d':
        return <WiCloudy />;
      case '04n':
        return <WiCloudy />;
      case '09d':
        return <WiRain />;
      case '09n':
        return <WiRain />;
      case '10d':
        return <WiRain />;
      case '10n':
        return <WiRain />;
      case '11d':
        return <WiThunderstorm />;
      case '11n':
        return <WiThunderstorm />;
      case '13d':
        return <WiSnow />;
      case '13n':
        return <WiSnow />;
      case '50d':
        return <WiFog />;
      case '50n':
        return <WiFog />;
      default:
        return <WiDaySunny />;
    }
  };

  return (
    <div className="weather-component">
      <div className="weather-header">
        <h1>Weather</h1>
      </div>
      <div className="search-container">
        <button
          type="submit"
          onClick={() => {
            if (searchTerm) {
              fetchWeather();
            }
          }}>
          <i className="fa fa-search"></i>
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
      </div>
      {found ? (
        <>
          <div className="weather-icon">
            {getWeatherIcon(weather.weather[0].icon)}
          </div>
          <div className="location">{weather.name}</div>
          <div className="temperature">{Math.trunc(weather.main.temp)} °C</div>
          <div className="condition">{weather.weather[0].main}</div>
          <div className="description">{weather.weather[0].description}</div>
        </>
      ) : (
        <div className="not-found">No weather found</div>
      )}
    </div>
  );
};

export default Weather;
