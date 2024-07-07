import "./current-weather.css"

function CurrentWeather({ data }) {
    return (
        <div className="weather">
            <p className="temperature">{Math.round((data.main.temp - 273) * 100) / 100}°C</p>
            <div className="parameter-row">
                <div className="weather-description">{data.weather[0].description}</div>
                <span className="parameter-label">Feels like</span>
                <span className="parameter-value">
                    {Math.round((data.main.feels_like - 273) * 100) / 100}°C
                </span>
            </div>
            <p style={{ fontSize: "1.5em", fontWeight: "600" }}>Details : </p>
            <div className="detail">
                <div className="detail-box-group">
                    <div className="detail-box">
                        <div className="detail-content-value">{data.main.humidity}%</div>
                        <div className="detail-content">Humidity</div>
                    </div>
                    <div className="detail-box">
                        <div className="detail-content-value">{data.main.pressure} mb</div>
                        <div className="detail-content">Pressure</div>
                    </div>
                </div>
                <div className="detail-box-group">
                    <div className="detail-box">
                        <div className="detail-content-value">{data.wind.speed} km/hr</div>
                        <div className="detail-content">Wind</div>
                    </div>
                    <div className="detail-box">
                        <div className="detail-content-value">{data.clouds.all} %</div>
                        <div className="detail-content">Clouds</div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default CurrentWeather