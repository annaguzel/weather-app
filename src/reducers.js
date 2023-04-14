const initialState = {
  todayWeather: null,
  forecast: null,
  metric: true,
  search: null,
  isLoading: true,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
        isLoading: true,
        error: null,
      };

    case "SET_METRIC":
      return {
        ...state,
        metric: action.payload,
      };
    case "GET_TODAY_WEATHER_SUCCESS":
      return {
        ...state,
        todayWeather: action.payload,
        isLoading: false,
        error: null,
      };
    case "GET_TODAY_WEATHER_ERROR":
      return {
        ...state,
        todayWeather: null,
        isLoading: false,
        error: "Error fetching today's weather",
      };
    case "GET_FORECAST_SUCCESS":
      return {
        ...state,
        forecast: [...action.payload],
        isLoading: false,
        error: null,
      };
    case "GET_FORECAST_ERROR":
      return {
        ...state,
        forecast: null,
        isLoading: false,
        error: "Error fetching forecast",
      };
    default:
      return state;
  }
};

export default weatherReducer;
