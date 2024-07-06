import './App.css';
import SearchBar from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { Weather_API_url } from './api';
import { Weather_API_Key } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecsat';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${Weather_API_url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_API_Key}`);
    const ForcastFetch = fetch(`${Weather_API_url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_API_Key}`);

    Promise.all([currentWeatherFetch, ForcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(err => console.log("error"));
  };

  return (
    <div className='container_app' >
      <SearchBar onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
