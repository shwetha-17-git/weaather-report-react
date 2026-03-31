import { useState } from "react";
import axios from "axios";
import "./weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc11151f62ed43437685fce8bdcd1f4f&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      {error && <p className="status-msg error">{error}</p>}

      {!weatherData && !error && (
        <div className="empty">
          <span>🌤</span>
          <p>Enter a city name to get started.</p>
        </div>
      )}

      {weatherData && (
        <div className="content">
          <div className="card hero-card">
            <div>
              <div className="city">
                {weatherData.name} <span>{weatherData.sys.country}</span>
              </div>
              <div className="desc">{weatherData.weather[0].description}</div>
              <div className="temp-row">
                <span className="temp">{Math.round(weatherData.main.temp)}</span>
                <span className="unit">°C</span>
              </div>
              <div className="feels">Feels like {Math.round(weatherData.main.feels_like)}°C</div>
            </div>
            <div className="hero-icon">🌤</div>
          </div>

          <div className="card stats-card">
            <div className="stat">
              <span className="stat-label">Temperature</span>
              <span className="stat-value">{Math.round(weatherData.main.temp)}°C</span>
            </div>
            <div className="stat">
              <span className="stat-label">Description</span>
              <span className="stat-value">{weatherData.weather[0].description}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Humidity</span>
              <span className="stat-value">{weatherData.main.humidity}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Weather</span>
              <span className="stat-value">{weatherData.weather[0].main}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}