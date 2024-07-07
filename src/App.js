import './App.css';
import SearchBar from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { Weather_API_url, Weather_API_Key } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('https://media.istockphoto.com/id/1477837346/photo/blue-sky-background-with-white-clouds.webp?b=1&s=170667a&w=0&k=20&c=mrQSUQ9x8giDk_nqOTV61njngf1BXLCG7YClgSMR7xU=');

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
        return 'https://media.istockphoto.com/id/522123182/photo/sunset-crepuscular-rays-pouring-though-scattered-clouds.webp?b=1&s=170667a&w=0&k=20&c=U-fSqc_3YKHvC_Qfx8E-q-4dIMazyZbHZ5zUileZya0=';
      case '09d':
        return 'https://c1.wallpaperflare.com/preview/963/100/993/rain-background-drop-weather.jpg'
      case '10d':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDR-Bg6cafZlmQcyyQieMO7qKP20ZKiC4t2Q&s';
      case '11d':
        return 'https://images.ctfassets.net/4ivszygz9914/2d13fe1a-7836-4e25-856f-d598b18ef620/30b6625bad94463569be8c0a5c9e19be/e39b7004-1f41-4b62-bd07-1d142da23c5c.jpeg?fit=fill&w=1200';
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
        return 'https://media.istockphoto.com/id/522123182/photo/sunset-crepuscular-rays-pouring-though-scattered-clouds.webp?b=1&s=170667a&w=0&k=20&c=U-fSqc_3YKHvC_Qfx8E-q-4dIMazyZbHZ5zUileZya0=';
      case '09n':
        return 'https://c1.wallpaperflare.com/preview/963/100/993/rain-background-drop-weather.jpg'
      case '10n':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDR-Bg6cafZlmQcyyQieMO7qKP20ZKiC4t2Q&s';
      case '11n':
        return 'https://images.ctfassets.net/4ivszygz9914/2d13fe1a-7836-4e25-856f-d598b18ef620/30b6625bad94463569be8c0a5c9e19be/e39b7004-1f41-4b62-bd07-1d142da23c5c.jpeg?fit=fill&w=1200';
      case '13n':
        return 'https://cdn.pixabay.com/photo/2016/11/26/21/48/trees-1861704_640.jpg';
      case '50n':
        return 'https://img.freepik.com/free-photo/vertical-shot-beautiful-green-trees-forest-foggy-table_181624-34182.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719964800&semt=ais_user';
      default:
        return 'https://img.freepik.com/free-photo/sky-dawn_1398-4604.jpg'; // Default background if no match found
    }
  };

  return (

    <div className='container_app' style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center', // Center the background image
      minHeight: '100vh', // Ensure background covers entire viewport
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <SearchBar onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
