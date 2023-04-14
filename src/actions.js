import axios from "axios";

const REACT_APP_WEATHER_API_KEY = "e3c0fbe69c4b2f7c621a75a300d25ca1";
export const setSearch = (search) => ({
  type: "SET_SEARCH",
  payload: search,
});

export const setMetric = (metric) => ({
  type: "SET_METRIC",
  payload: metric,
});

export const getTodayWeather =
  ({ lat, lon, metric, showToastMessage }) =>
  (dispatch) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${
          metric ? "metric" : "imperial"
        }&appid=${REACT_APP_WEATHER_API_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "GET_TODAY_WEATHER_SUCCESS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
        showToastMessage();
        dispatch({ type: "GET_TODAY_WEATHER_ERROR" });
      });
  };

export const getForecast =
  ({ lat, lon, metric, showToastMessage }) =>
  (dispatch) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${
          metric ? "metric" : "imperial"
        }&appid=${REACT_APP_WEATHER_API_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "GET_FORECAST_SUCCESS",
          payload: res.data.list,
        });
      })
      .catch((error) => {
        console.error(error);
        showToastMessage();
        dispatch({ type: "GET_FORECAST_ERROR" });
      });
  };
