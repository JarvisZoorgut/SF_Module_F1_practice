import React, { useState } from 'react';
import { fetchWeatherData, fetchForecastData } from '../api/weather';
import './MainPage.css'; // подключим стили отдельно (см. ниже)

interface Weather {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
}

const MainPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState<string>('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    setError('');
    try {
      const currentWeather = await fetchWeatherData(city);
      setWeather(currentWeather);

      const weatherForecast = await fetchForecastData(city);
      setForecast(weatherForecast.list);
    } catch (error) {
      console.error(error);
      setError('Не удалось найти город или получить данные.');
    }
  };

  return (
    <div className="container">
      <h1>Прогноз погоды</h1>

      <input
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={handleCityChange}
        className="input"
      />
      <button onClick={handleSearch} className="button">
        Найти
      </button>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="section">
          <h2>Текущая погода в {weather.name}</h2>
          <div className="card">
            <p>Температура: {weather.main.temp} °C</p>
            <p>Описание: {weather.weather[0].description}</p>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="section">
          <h2>Прогноз на следующие 5 дней</h2>
          <div className="forecast-grid">
            {forecast
              .filter((_, index) => index % 8 === 0)
              .map((forecastItem, index) => (
                <div className="card" key={index}>
                  <p>{new Date(forecastItem.dt * 1000).toLocaleDateString("ru-RU")}</p>
                  <p>Температура: {forecastItem.main.temp} °C</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
