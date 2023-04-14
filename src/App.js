import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "./components/search/Search.js";
import TodayWeather from "./components/today/Today.js";
import Forecast from "./components/forecast/Forecast.js";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setMetric, setSearch, getTodayWeather, getForecast } from "./actions";

function App() {
  const dispatch = useDispatch();
  const { todayWeather, forecast, metric, search } =
    useSelector((state) => state.weather) || {};
  const handleOnSearchChange = (searchData) => {
    dispatch(setSearch(searchData));
  };

  const showToastMessage = () => {
    toast.error("Something went wrong !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    if (search) {
      const [lat, lon] = search.value.split(" ");
      dispatch(getTodayWeather({ lat, lon, metric, showToastMessage }));
      dispatch(getForecast({ lat, lon, metric, showToastMessage }));
    }
  }, [dispatch, metric, search]);

  return (
    <div className="container">
      <div className="search-container">
        <div className="search-input">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
        <button onClick={() => dispatch(setMetric(!metric))}>
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
