import React from "react";
import "./Forecast.css";

export default function Forecast (forecast){
    console.log(forecast.info)
    return(
        <div className= "row">
            <div class="col first">
                <h4>{forecast.info.icon1}</h4>
                <p class="card-text topLow"><strong>{forecast.info.max1}°</strong> {forecast.info.min1}°</p>
                <p class="card-text maxMin"><strong>Max</strong> Min</p>
                <p class="card-text day">{forecast.info.wd1}</p>
            </div>
            <div class="col second">
                <h4>{forecast.info.icon2}</h4>
                <p class="card-text topLow"><strong>{forecast.info.max2}°</strong> {forecast.info.min2}°</p>
                <p class="card-text maxMin"><strong>Max</strong> Min</p>
                <p class="card-text day">{forecast.info.wd2}</p>
            </div>
            <div class="col third">
                <h4>{forecast.info.icon3}</h4>
                <p class="card-text topLow"><strong>{forecast.info.max3}°</strong> {forecast.info.min3}°</p>
                <p class="card-text maxMin"><strong>Max</strong> Min</p>
                <p class="card-text day">{forecast.info.wd3}</p>
            </div>
            <div class="col fourth">
                <h4>{forecast.info.icon4}</h4>
                <p class="card-text topLow"><strong>{forecast.info.max4}°</strong> {forecast.info.min4}°</p>
                <p class="card-text maxMin"><strong>Max</strong> Min</p>
                <p class="card-text day">{forecast.info.wd4}</p>
            </div>
        </div>
    );
}