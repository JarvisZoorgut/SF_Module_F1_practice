import axios from 'axios';

const API_KEY = '20d9540fb16cb570d9ce86b4c90329ea';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeatherData = async (city: string, units: string = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: city,
        units,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchForecastData = async (city: string, units: string = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}forecast`, {
      params: {
        q: city,
        units,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};
