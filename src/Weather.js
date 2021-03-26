import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Weather () {
    const apiKey = '055d247c8d86f6f7cc330f806f31830d';
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
    let [cButton, setCButton] = useState("btn btn-dark active disable");
    let [cDisable, setCDisable] = useState("true");
    let [fButton, setFButton] = useState("btn btn-dark");
    let [fDisable, setFDisable] = useState("false");

    let [search, setSearch] = useState(false); // to know when we're expecting results

 
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
        setCity(response.data.name); //to use city in case of unit switch
        console.log(cityTemp);
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
            wd1:forecastWeekDay(response.data.list[8].dt*1000), icon1:<i className={`fas ${icons[response.data.list[8].weather[0].icon]}`}></i>, temp1:Math.round(response.data.list[8].main.temp),
            wd2:forecastWeekDay(response.data.list[16].dt*1000), icon2:<i className={`fas ${icons[response.data.list[16].weather[0].icon]}`}></i>, temp2:Math.round(response.data.list[16].main.temp),
            wd3:forecastWeekDay(response.data.list[24].dt*1000), icon3:<i className={`fas ${icons[response.data.list[24].weather[0].icon]}`}></i>, temp3:Math.round(response.data.list[24].main.temp),
            wd4:forecastWeekDay(response.data.list[32].dt*1000), icon4:<i className={`fas ${icons[response.data.list[32].weather[0].icon]}`}></i>, temp4:Math.round(response.data.list[32].main.temp)});
        console.log(forecast);
    }

    function showC(event){
        event.preventDefault(); 
        setUnits("metric");
        setCButton("btn btn-dark active disable");
        setCDisable("true");
        setFButton("btn btn-dark");
        setFDisable("false");
        let apiUrl = {cityWeather:`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
        cityForecast:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`};
        axios.get(apiUrl.cityWeather).then(weatherData);
        axios.get(apiUrl.cityForecast).then(forecastData);
    }
    function showF(event){
        event.preventDefault();
        setUnits("imperial");
        setCButton("btn btn-dark");
        setCDisable("false");
        setFButton("btn btn-dark active disable");
        setFDisable("true");
        let apiUrl = {cityWeather:`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
        cityForecast:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`};
        axios.get(apiUrl.cityWeather).then(weatherData);
        axios.get(apiUrl.cityForecast).then(forecastData);
    }

    function searchSubmit(event){
        event.preventDefault();
        let apiUrl = {cityWeather:`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
        cityForecast:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`};
        axios.get(apiUrl.cityWeather).then(weatherData);
        axios.get(apiUrl.cityForecast).then(forecastData);
    }

    function myPosition(response) {
        console.log(response);
        setCityTemp({wContent: false});
        setForecast({fContent: false});
        let apiUrl = {currLocWeather: `https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&units=${units}&appid=${apiKey}`,
        currLocForecast:`https://api.openweathermap.org/data/2.5/forecast?q=${response.coords.latitude}&lon=${response.coords.longitude}&units=${units}&appid=${apiKey}`};
        axios.get(apiUrl.currLocWeather).then(weatherData);
        axios.get(apiUrl.currLocForecast).then(forecastData);
        console.log(apiUrl);
    }

    function getPosition() {
        navigator.geolocation.getCurrentPosition(myPosition);
    }

    const form = (<form id="city-form" onSubmit={searchSubmit}>
                    <div className="row">
                        <div className="col-7">
                            <input type="search" placeholder="Enter a city" className="form-control mr-1" autoComplete="yes" onChange={newCity}/>
                        </div>
                        <div className="col-4">
                            <input type="submit" value="🔍" className="btn btn-light mr-1"/>
                            <input type="reset" value="Current Location" className="btn btn-light mr-4" onClick={getPosition}/>
                            <a href="/" rel="noreferrer" className={cButton} role="button" data-bs-toggle="button" aria-disabled={cDisable} onClick={showC}>C</a> | <a href="/" rel="noreferrer" className={fButton} role="button" data-bs-toggle="button" aria-disabled={fDisable} onClick={showF}>F</a>
                        </div>
                    </div>
                </form>);

    if (cityTemp.wContent && forecast.fContent){
        return (
            <div className= "Weather card container">
                {form}
                <div id="main">
                    <WeatherInfo info={cityTemp} precip={forecast.precipitation}/>
                    <div className="row mt-3"  id="forecast">
                        <Forecast info={forecast}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className= "Weather card container">
                {form}
                <h2>{search ? "Loading ...":""}</h2>
            </div>
        );
    }
}