import React from "react";
import "./Weather.css";
import Date from "./Date.js";

export default function Weather () {
    return<div className= "Weather card container">
        <form id="city-form">
            <div className="row">
                <div className="col-6">
                    <input type="search" placeholder="Enter a city" className="mr-1 form-control"/>
                </div>
                <div className="col-6">
                    <input type="submit" value="🔍" className="btn btn-light mr-1"/>
                    <input type="button" value="Current location" className="btn btn-light mr-1"/>
                </div>
            </div>
        </form>
        <div className="row g-3" id="city-temp">
            <span className="col-xs-6 col-sm-3">
                <h1 className= "card-title">Country</h1>
                <ul>
                    <li><h5 className= "card-subtitle mb-2 text-muted"><Date/></h5></li>
                    <li className="card-subtitle mb-2 text-muted">Humidity:</li>
                    <li className="card-subtitle mb-2 text-muted">Wind Speed:</li>
                    <li className="card-subtitle mb-2 text-muted">Precipitation:</li>
                </ul>
            </span>
            <span className="col-xs-6 col-sm-2" id="icon">
                <ul>
                    <li><h2 className="card-title">🌦</h2></li>
                    <li className="card-subtitle mb-2 text-muted">Description</li>
                </ul>
            </span>
            <span className="col-xs-12 col-sm-7"  id="temp">
                <div className="row">
                    <span className="col-xs-8 col-sm-4">
                        <ul>
                            <li><h2 className="card-title">-100°</h2></li>
                            <li className="card-subtitle mb-2 text-muted">Feels like:</li>
                        </ul>
                    </span>
                    <span className="col-xs-4 col-sm-2">
                        <ul>
                            <li><h4 className="card-title">C | F</h4></li>
                            <li className="card-subtitle mb-2">Max:</li>
                            <li className="card-subtitle mb-2">Min:</li>
                        </ul>
                    </span>
                </div>
            </span>
        </div>
        <div className="row"  id="forecast">
            <h3>Forecast</h3>
        </div>
    </div>;
}