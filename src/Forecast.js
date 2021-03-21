import React from "react";
import "./Forecast.css";

export default function (forecast){
    console.log(forecast.info)
    let index = 1;

    while (index < 5) {
        index = index + 1 ;
        return(
        <div className= "row">
            <div class="col">
                <h4>{forecast.info.icon[index]}</h4>
                <p class="card-text topLow"><strong>{forecast.info.max[index]}°</strong> {forecast.info.min[index]}°</p>
                <p class="card-text maxMin"><strong>Max</strong> Min</p>
                <p class="card-text day">{forecast.info.wd[index]}</p>
            </div>
        </div>
        );
  }
}