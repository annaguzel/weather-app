import React from "react";
import "./today-weather.css";

const TodayWeather = ({ data, metric }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data?.name}</p>
          <p className="country">{data?.sys?.country}</p>
          <p className="weather-description">
            {data?.weather?.[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data?.weather?.[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">
          {Math.round(data.main.temp)}°{metric ? "C" : "F"}
        </p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°{metric ? "C" : "F"}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
