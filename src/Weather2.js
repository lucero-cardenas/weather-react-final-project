import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";

export default function Weather () {
    const apiKey = '82d58ea2bafbe8a8a9c84742e41d01ce';
    let [city, setCity] = useState ("New York");
    const unitArray = {metric:" km/h", imperial:" mph"};
    let [units, setUnits] = useState("metric");
    let [cityTemp, setCityTemp] = useState({wContent: false});
    let [forecast, setForecast] = useState({fContent: false});
    let icons = {
        "01d": `fa-sun`,
        "01n": `fa-moon`,
        "02d": `fa-cloud-sun`,
        "02n": `fa-cloud-moon`,
        "03d": `fa-cloud`,
        "03n": `fa-cloud`,
        "04d": `fa-cloud`,
        "04n": `fa-cloud`,
        "09d": `fa-cloud-showers-heavy`,
        "09n": `fa-cloud-showers-heavy`,
        "10d": `fa-cloud-rain`,
        "10n": `fa-cloud-rain`,
        "11d": `fa-bolt`,
        "11n": `fa-bolt`,
        "13d": `fa-snowflake`,
        "13n": `fa-snowflake`,
        "50d": `fa-smog`,
        "50n": `fa-smog`
    };

 
    function newCity(event) {
        setCity(event.target.value);
    }

    function weatherData(response){
        setCityTemp({wContent:true,
            country:response.data.sys.country,
            city:response.data.name,
            temperature:Math.round(response.data.main.temp),
            max:Math.round(response.data.main.temp_max),
            min:Math.round(response.data.main.temp_min),
            icon:<i className={`fas ${icons[response.data.weather[0].icon]}`} alt={response.data.weather[0].description}></i>,
            humidity:response.data.main.humidity,
            wind_speed:`${response.data.wind.speed}${unitArray[units]}`,
            description:response.data.weather[0].description,
            feels_like:Math.round(response.data.main.feels_like)});
    }
    function forecastData(response){
        console.log(response);

        function forecastWeekDay(timeStamp){
            let newDate = new Date(timeStamp);
            let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let day = days[newDate.getDay()]
            return `${day}`;
        }
        setForecast({fContent:true,
            precipitation:response.data.list[0].pop*100,
            wd1:forecastWeekDay(response.data.list[8].dt*1000), icon1:<i className={`fas ${icons[response.data.list[8].weather[0].icon]}`}></i>, max1:Math.round(response.data.list[8].main.temp_max), min1:Math.round(response.data.list[8].main.temp_min),
            wd2:forecastWeekDay(response.data.list[16].dt*1000), icon2:<i className={`fas ${icons[response.data.list[16].weather[0].icon]}`}></i>, max2:Math.round(response.data.list[16].main.temp_max), min2:Math.round(response.data.list[16].main.temp_min),
            wd3:forecastWeekDay(response.data.list[24].dt*1000), icon3:<i className={`fas ${icons[response.data.list[24].weather[0].icon]}`}></i>, max3:Math.round(response.data.list[24].main.temp_max), min3:Math.round(response.data.list[24].main.temp_min),
            wd4:forecastWeekDay(response.data.list[32].dt*1000), icon4:<i className={`fas ${icons[response.data.list[32].weather[0].icon]}`}></i>, max4:Math.round(response.data.list[32].main.temp_max), min4:Math.round(response.data.list[32].main.temp_min)});
    }

    function showC(event){
        event.preventDefault();
        setUnits("metric");
        searchSubmit();
    }
    function showF(event){
        event.preventDefault();
        setUnits("imperial");
        searchSubmit();
    }

    function searchSubmit(event){
        event.preventDefault();
        let apiUrl = {cityWeather:`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
        cityForecast:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`};
        axios.get(apiUrl.cityWeather).then(weatherData);
        axios.get(apiUrl.cityForecast).then(forecastData);
        console.log(apiUrl.cityForecast);
    }

    const form = (<form id="city-form" onSubmit={searchSubmit}>
                    <div className="row">
                        <div className="col-8">
                            <input type="search" placeholder="Enter a city" className="form-control" autoComplete="yes" onChange={newCity}/>
                        </div>
                        <div className="col-4">
                            <input type="submit" value="🔍" className="btn btn-light mr-4"/>

                        </div>
                    </div>
                </form>);

    if (cityTemp.wContent && forecast.fContent){
        return (
            <div className= "Weather card container">
                {form}
                <span className= "row">
                    <h4 className="col-6 card-title"></h4>
                    <span className="col-6"><button type="link" href="/" onCLick={showC}>C</button> | <button type="link" href="/" onCLick={showF}>F</button></span>
                </span>
                <WeatherInfo info={cityTemp} precip={forecast.precipitation}/>
                <div className="row"  id="forecast">
                    <Forecast info={forecast}/>
                </div>
            </div>);
    } else {
        return (
            <div className= "Weather card container">
                {form}
                <h2>Loading...</h2>
            </div>);
    }
}