import React from "react";
import "./Weather.css";
import Date from "./Date.js";

export default function Weather () {
    return<div className= "Weather">
        <h1 className= "card-title">Country</h1>
        <ul>
            <li><h5 className= "card-subtitle"><Date/></h5></li>
            <li>Humidity:</li>
            <li>Wind Speed:</li>
            <li>Precipitation:</li>
        </ul>
    </div>;
}