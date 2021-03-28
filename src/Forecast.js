import React from "react";
import "./Forecast.css";

export default function Forecast (forecast){
    return(
        <div className= "row">
            <div className="col first">
                <h4>{forecast.info.icon1}</h4>
                <p className="card-text temp1"><strong>{forecast.info.temp1}°</strong></p>
                <p className="card-text day">{forecast.info.wd1}</p>
            </div>
            <div className="col second">
                <h4>{forecast.info.icon2}</h4>
                <p className="card-text temp2"><strong>{forecast.info.temp2}°</strong></p>
                <p className="card-text day">{forecast.info.wd2}</p>
            </div>
            <div className="col third">
                <h4>{forecast.info.icon3}</h4>
                <p className="card-text temp3"><strong>{forecast.info.temp3}°</strong></p>
                <p className="card-text day">{forecast.info.wd3}</p>
            </div>
            <div className="col fourth">
                <h4>{forecast.info.icon4}</h4>
                <p className="card-text temp4"><strong>{forecast.info.temp4}°</strong></p>
                <p className="card-text day">{forecast.info.wd4}</p>
            </div>
        </div>
    );
}