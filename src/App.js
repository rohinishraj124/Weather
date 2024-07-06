import './App.css';
import SearchBar from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { Weather_API_url, Weather_API_Key } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${Weather_API_url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_API_Key}`);
    const forecastFetch = fetch(`${Weather_API_url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_API_Key}`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [weatherResponse, forecastResponse] = await Promise.all(responses.map((response) => response.json()));

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        // Set background image based on weather icon
        const weatherIcon = weatherResponse.weather[0].icon;
        setBackgroundImage(getBackgroundImage(weatherIcon));
      })
      .catch(err => console.log(err));
  };
  console.log(currentWeather)

  const getBackgroundImage = (weatherIcon) => {
    // Weather icon codes typically have a format like '01d', '02d', '10n', etc.
    // You can map these to specific background images based on your requirements.
    switch (weatherIcon) {
      case '01d':
        return 'https://media.istockphoto.com/id/502046948/photo/beautiful-sky-with-white-cloud-background.jpg?s=612x612&w=0&k=20&c=hBbaa1nRQnK9XMnHNscCJnkzjjVXEYRJ3IQvgSGPprg=';
      case '02d':
        return 'https://img.freepik.com/premium-photo/blue-sky-white-clouds-background-portrait_644862-13.jpg';
      case '03d':
        return 'https://png.pngtree.com/background/20230530/original/pngtree-clouds-covered-the-sky-in-the-morning-scattered-clouds-covered-the-picture-image_2818771.jpg'
      case '04d':
        return 'https://img.freepik.com/premium-photo/low-angle-view-sky_1048944-437358.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716508800&semt=ais_user';
      case '09d':
        return 'https://c1.wallpaperflare.com/preview/963/100/993/rain-background-drop-weather.jpg'
      case '10d':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDR-Bg6cafZlmQcyyQieMO7qKP20ZKiC4t2Q&s';
      case '11d':
        return 'https://media.istockphoto.com/id/469850273/photo/lightning-with-dramatic-cloudscape.jpg?s=612x612&w=0&k=20&c=AwlD6sOgSOaX6MojEFnIiwzLMmX0WZ_bT-dTMgv-hXk=';
      case '13d':
        return 'https://cdn.pixabay.com/photo/2016/11/26/21/48/trees-1861704_640.jpg';
      case '50d':
        return 'https://img.freepik.com/free-photo/vertical-shot-beautiful-green-trees-forest-foggy-table_181624-34182.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719964800&semt=ais_user';


      case '01n':
        return 'https://media.istockphoto.com/id/502046948/photo/beautiful-sky-with-white-cloud-background.jpg?s=612x612&w=0&k=20&c=hBbaa1nRQnK9XMnHNscCJnkzjjVXEYRJ3IQvgSGPprg=';
      case '02n':
        return 'https://img.freepik.com/premium-photo/blue-sky-white-clouds-background-portrait_644862-13.jpg';
      case '03n':
        return 'https://png.pngtree.com/background/20230530/original/pngtree-clouds-covered-the-sky-in-the-morning-scattered-clouds-covered-the-picture-image_2818771.jpg'
      case '04n':
        return 'https://img.freepik.com/premium-photo/low-angle-view-sky_1048944-437358.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716508800&semt=ais_user';
      case '09n':
        return 'https://c1.wallpaperflare.com/preview/963/100/993/rain-background-drop-weather.jpg'
      case '10n':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDR-Bg6cafZlmQcyyQieMO7qKP20ZKiC4t2Q&s';
      case '11n':
        return 'https://media.istockphoto.com/id/469850273/photo/lightning-with-dramatic-cloudscape.jpg?s=612x612&w=0&k=20&c=AwlD6sOgSOaX6MojEFnIiwzLMmX0WZ_bT-dTMgv-hXk=';
      case '13n':
        return 'https://cdn.pixabay.com/photo/2016/11/26/21/48/trees-1861704_640.jpg';
      case '50n':
        return 'https://img.freepik.com/free-photo/vertical-shot-beautiful-green-trees-forest-foggy-table_181624-34182.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719964800&semt=ais_user';
      default:
        return null; // Default background if no match found
    }
  };

  return (
    <div className='container_app' style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', // Ensure background covers entire viewport
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: "skyblue"
    }}>
      <SearchBar onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
