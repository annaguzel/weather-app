import { useState, useEffect } from "react";
import Search from "./components/search/Search.js";
import TodayWeather from "./components/today/Today.js";
import Forecast from "./components/forecast/Forecast.js";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "e3c0fbe69c4b2f7c621a75a300d25ca1";

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [metric, setMetric] = useState(true);
  const [search, setSearch] = useState(null);
  const handleOnSearchChange = (searchData) => {
    setSearch(searchData);
  };
  const showToastMessage = () => {
    toast.error("Something went wrong !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    if (search) {
      const [lat, lon] = search.value.split(" ");

      const todayWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${
          metric ? "metric" : "imperial"
        }`
      );

      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${
          metric ? "metric" : "imperial"
        }`
      );

      Promise.all([todayWeatherFetch, forecastFetch])
        .then(async (responses) => {
          const [todayWeatherResponse, forecastResponse] = await Promise.all(
            responses.map((response) => {
              if (!response.ok) {
                showToastMessage();
              }
              return response.json();
            })
          );
          todayWeatherResponse?.cod === 200 &&
            setTodayWeather({ city: search.label, ...todayWeatherResponse });
          forecastResponse?.cod === "200" &&
            setForecast({ city: search.label, ...forecastResponse });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [metric, search]);

  return (
    <div className="container">
      <div className="search-container">
        <div className="search-input">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
        <button onClick={() => setMetric(!metric)}>
          {metric ? "Show Fahrenheit" : "Show Celsius"}
        </button>
      </div>
      {todayWeather && <TodayWeather data={todayWeather} metric={metric} />}
      {forecast && <Forecast data={forecast} metric={metric} />}
      <ToastContainer />
    </div>
  );
}

export default App;
