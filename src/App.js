import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function App() {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt_br&appid=${api_key}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  }

  const searchLocationButton = () => {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
  }

  return (
    <Fragment>
      <div className="app">
        <div className="search">
            <input
              value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Digite o nome da cidade"
              type="text"
            />
            <button onClick={searchLocationButton}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
                <span>Sensação térmica</span>
              </div>
              <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <span>Humidade</span>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
                <span>Vento</span>
              </div>
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;