import React from "react";
import "./Weather.css";
import Date from "./Date.js";

export default function Weather () {
    return<div className= "Weather card">
        <div className="row">
            <form>
                <input type="text" placeholder="Enter a city"/>
            </form>
        </div>
        <div className="row">
            <span className="card card-body col-xs-6 col-md-3 w-0">
                <h1 className= "card-title">Country</h1>
                <ul>
                    <li><h5 className= "card-subtitle mb-2 text-muted"><Date/></h5></li>
                    <li className="card-subtitle mb-2 text-muted">Humidity:</li>
                    <li className="card-subtitle mb-2 text-muted">Wind Speed:</li>
                    <li className="card-subtitle mb-2 text-muted">Precipitation:</li>
                </ul>
            </span>
            <span className="card card-body col-xs-6 col-md-3 w-0 icon">
                <ul>
                    <li><h2 className="card-title">🌦</h2></li>
                    <li className="card-subtitle mb-2 text-muted">Description</li>
                </ul>
            </span>        
            <span className="card card-body col-xs-6 col-md-3 w-0 temp">
                <ul>
                    <li><h2 className="card-title">-13°</h2></li>
                    <li className="card-subtitle mb-2 text-muted">Feels like:</li>
                </ul>
            </span>
            <span className="card card-body col-xs-6 col-md-3 w-0">
                <ul>
                    <li><h4 className="card-title">C | F</h4></li>
                    <li className="card-subtitle mb-2">Max:</li>
                    <li className="card-subtitle mb-2">Min:</li>
                </ul>
            </span>
        </div>
        <div className="row">
            <h3>Forecast</h3>
        </div>
    </div>;
}