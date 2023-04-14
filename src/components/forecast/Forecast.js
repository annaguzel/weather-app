import React from "react";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data, metric }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const forecastData = data ? data.slice(0, 7) : [];

  return (
    <>
      <div className="title-wrapper">
        <h1 className="title">Weather forecast</h1>
      </div>
      {forecastData.map((item, idx) => (
        <React.Fragment key={item.dt}>
          <div className="daily-item">
            <img
              src={`icons/${item.weather[0].icon}.png`}
              className="icon-small"
              alt="weather"
            />
            <label className="day">{forecastDays[idx]}</label>
            <label className="description">{item.weather[0].description}</label>
            <label className="min-max">
              {Math.round(item.main.temp_max)}°{metric ? "C" : "F"} /
              {Math.round(item.main.temp_min)}°{metric ? "C" : "F"}
            </label>
          </div>

          <div className="daily-details-grid">
            <div className="daily-details-grid-item">
              <label>Pressure:</label>
              <label>{item.main.pressure}</label>
            </div>
            <div className="daily-details-grid-item">
              <label>Humidity:</label>
              <label>{item.main.humidity}</label>
            </div>
            <div className="daily-details-grid-item">
              <label>Clouds:</label>
              <label>{item.clouds.all}%</label>
            </div>
            <div className="daily-details-grid-item">
              <label>Wind speed:</label>
              <label>{item.wind.speed} m/s</label>
            </div>
            <div className="daily-details-grid-item">
              <label>Sea level:</label>
              <label>{item.main.sea_level}m</label>
            </div>
            <div className="daily-details-grid-item">
              <label>Feels like:</label>
              <label>
                {item.main.feels_like}°{metric ? "C" : "F"}
              </label>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default Forecast;
