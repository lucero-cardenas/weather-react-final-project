import React from "react";
import CurrentTime from "./CurrentTime.js";

export default function WeatherInfo(cityTemp){
    console.log(cityTemp);
    return(
        <div>
            <span className="row"><h1 className= "card-title">{cityTemp.info.city}, {cityTemp.info.country}</h1></span>
            <div className="row g-3" id="city-temp">
                <span className="col-xs-6 col-sm-4">
                    <ul>
                        <li><h5 className= "card-subtitle mb-2 text-muted"><CurrentTime/></h5></li>
                        <li className="card-subtitle mb-2 text-muted">Humidity: {cityTemp.info.humidity}%</li>
                        <li className="card-subtitle mb-2 text-muted">Wind Speed: {cityTemp.info.wind_speed}</li>
                        <li className="card-subtitle mb-2 text-muted">Precipitation: {cityTemp.precip}%</li>
                    </ul>
                </span>
                <span className="col-xs-6 col-sm-2" id="icon">
                    <ul>
                        <li><h2 className="card-title">{cityTemp.info.icon}</h2></li>
                        <li className="card-subtitle mb-2 text-muted">{cityTemp.info.description}</li>
                    </ul>
                </span>
                <span className="col-xs-12 col-sm-6"  id="temp">
                    <div className="row">
                        <span className="col-xs-8 col-sm-4">
                            <ul>
                                <li><h2 className="card-title">{cityTemp.info.temperature}°</h2></li>
                                <li className="card-subtitle mb-2 text-muted">Feels like: {cityTemp.info.feels_like}°</li>
                            </ul>
                        </span>
                        <span className="col-xs-4 col-sm-2">
                            <ul>
                                <li className="card-subtitle mb-2"><strong>Max: {cityTemp.info.max}°</strong></li>
                                <li className="card-subtitle mb-2">Min: {cityTemp.info.min}°</li>
                            </ul>
                        </span>
                    </div>
                </span>
            </div>
        </div>
    );
}