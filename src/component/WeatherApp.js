import React, { useEffect, useState } from "react";


export default function WeatherApp() {
  const [search, setSearch] = useState("Delhi");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const apiKey = process.env.REACT_APP_WEATHER_APP_API
  

  
  useEffect(() => {
    let componentMounted = true;
    const fetchWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);

      if (componentMounted) {
        setData(await response.json());
        // console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };

    fetchWeather();
  }, [search,apiKey]);

  // Dynamic Emoji
  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa fa-bolt";
    } else if (data.weather[0].main === "drizzle") {
      emoji = "fa fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa fa-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa fa-snow-flake";
    } else {
      emoji = "fa fa-smog";
    }
  } 
  else {
     return <p>Enter Correct City Name</p>;
  }

  // Current Date
  let current = new Date();
  let date = current.getDate();
  let day = current.toLocaleString("Default", { weekday: "long" });
  let month = current.toLocaleString("Default", { month: "long" });
  let year = current.getFullYear();

  // Current Time
  let time = current.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card text-center border-0  text-white">
              <img
                src={`https://source.unsplash.com/random/650x800/?${data.weather[0].main}`}
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3 mt-3 mx-auto w-75">
                    <input
                      type="search"
                      name="search"
                      value={input}
                      className="form-control"
                      placeholder="Search City"
                      onChange={(e) => {
                        setInput(e.target.value);
                      }}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text btn btn-dark"
                    >
                      <i className="fa-solid fa-magnifying-glass-location"></i>
                    </button>
                  </div>
                </form>
                  <div className="bg-dark bg-opacity-50 py-3">
                    <h3 className="card-title">{search}</h3>
                    <p className="card-text lead">
                      {day} {date} {month} {year}
                    </p>
                    <p>{time}</p>
                    <hr />
                    <i className={`fas ${emoji} fa-4x`}></i>
                    <h1>{data.main.temp} &deg;C</h1>
                    <p className="lead fw-bolder mb-0">
                      {data.weather[0].main}
                    </p>
                    <p className="lead ">
                      <span className="fw-bold">min</span> -{" "}
                      {data.main.temp_min} &deg;C |{" "}
                      <span className="fw-bold">max</span> -{" "}
                      {data.main.temp_max} &deg;C
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
