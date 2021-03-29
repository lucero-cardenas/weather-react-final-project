import React from "react";
import CurrentTime from "./CurrentTime.js";
import "./WeatherInfo.css"

export default function WeatherInfo(cityTemp){
    console.log(cityTemp);
    let units = "";
    if (cityTemp.units === "metric"){
        units = "C";
    } else {
        units = "F";
    }
    return(
        <div>
            <div className="row">
                <h1 className= "col-12 cityCountry">{cityTemp.info.city}, {cityTemp.info.country}</h1>
            </div>
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
                        <li className="card-subtitle mb-2 text-muted text-capitalize">{cityTemp.info.description}</li>
                    </ul>
                </span>
                <span className="col-xs-12 col-sm-6"  id="temp">
                    <div className="row">
                        <span className="col-xs-8 col-sm-4">
                            <ul>
                                <li><h2 className="card-title">{cityTemp.info.temperature}°{units}</h2></li>
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