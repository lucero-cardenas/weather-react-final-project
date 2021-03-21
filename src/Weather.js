import React, { useState } from "react";
import "./Weather.css";
import CurrentTime from "./CurrentTime.js";
import axios from "axios";

export default function Weather () {
    const apiKey = '82d58ea2bafbe8a8a9c84742e41d01ce';
    let position = null;
    let [city, setCity] = useState ("");
    let [search, setSearch] = useState (false);
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

    getPosition();

    function myPosition(response){
        position = {latitude: response.coords.latitude, longitude: response.coords.longitude};
        getTemp();
    }    
    function getPosition(){
        navigator.geolocation.getCurrentPosition(myPosition);
        setSearch(false);
    }

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
            icon:response.data.weather[0].icon,
            humidity:response.data.main.humidity,
            wind_speed:response.data.wind.speed,
            description:response.data.weather[0].description,
            feels_like:response.data.main.feels_like});
        setWContent(true);
    }
    function forecastData(response){
        console.log(response);
        setForecast({fContent:true,
            precipitation:response.data.list[0].pop*100,
            icon1:"", max1:"", min1:"", icon2:"", max2:"", min2:"", icon3:"", max3:"", min3:"", icon4:"", max4:"", min4:""});
        setFContent(true);
    }
    function getTemp(){
        setWContent(false);
        setFContent(false);
    }

    function showC(event){
        event.preventDefault();
        setUnits("metric");
        getTemp();
    }
    function showF(event){
        event.preventDefault();
        setUnits("imperial");
        getTemp();
    }

    function searchSubmit(event){
        event.preventDefault();
        setSearch(true);
        getTemp();
    }

    const form = (<form id="city-form" onSubmit={searchSubmit}>
                    <div className="row">
                        <div className="col-8">
                            <input type="search" placeholder="Enter a city" className="form-control" onChange={newCity}/>
                        </div>
                        <div className="col-4">
                            <input type="submit" value="🔍" className="btn btn-light mr-4"/>
                            <input type="button" value="Current location" className="btn btn-light" onCLick={getPosition}/>
                        </div>
                    </div>
                </form>);

    if (cityTemp.wContent && forecast.fContent){
        return (
            <div className= "Weather card container">
                {form}
                <span className="row"><h1 className= "card-title">{cityTemp.city}, {cityTemp.country}</h1></span>
                <div className="row g-3" id="city-temp">
                    <span className="col-xs-6 col-sm-4">
                        <ul>
                            <li><h5 className= "card-subtitle mb-2 text-muted"><CurrentTime/></h5></li>
                            <li className="card-subtitle mb-2 text-muted">Humidity:{cityTemp.humidity}%</li>
                            <li className="card-subtitle mb-2 text-muted">Wind Speed: {cityTemp.wind_speed} {unitArray[units]}</li>
                            <li className="card-subtitle mb-2 text-muted">Precipitation: {forecast.precipitation}%</li>
                        </ul>
                    </span>
                    <span className="col-xs-6 col-sm-2" id="icon">
                        <ul>
                            <li><h2 className="card-title"><i className={`fas ${icons[cityTemp.icon]}`}></i></h2></li>
                            <li className="card-subtitle mb-2 text-muted">{cityTemp.description}</li>
                        </ul>
                    </span>
                    <span className="col-xs-12 col-sm-6"  id="temp">
                        <div className="row">
                            <span className="col-xs-8 col-sm-4">
                                <ul>
                                    <li><h2 className="card-title">`${cityTemp.temperature}°`</h2></li>
                                    <li className="card-subtitle mb-2 text-muted">`Feels like: ${cityTemp.feels_like}°`</li>
                                </ul>
                            </span>
                            <span className="col-xs-4 col-sm-2">
                                <ul>
                                    <li><h4 className="card-title"><button type="link" href="/" onCLick={showC}>C</button> | <button type="link" href="/" onCLick={showF}>F</button></h4></li>
                                    <li className="card-subtitle mb-2"><strong>Max: {cityTemp.max}°</strong></li>
                                    <li className="card-subtitle mb-2">Min: {cityTemp.min}°</li>
                                </ul>
                            </span>
                        </div>
                    </span>
                </div>
                <div className="row"  id="forecast">
                    <h3>Forecast</h3>
                </div>
            </div>);
    } else {
        let apiUrl = {cityWeather:`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
        cityForecast:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`,
        currLocWeather: `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&units=${units}&appid=${apiKey}`,
        currLocForecast:`https://api.openweathermap.org/data/2.5/forecast?q=${position.latitude}&lon=${position.longitude}&units=${units}&appid=${apiKey}`};

        if (search){
            axios.get(apiUrl.cityWeather).then(weatherData);
            axios.get(apiUrl.cityForecast).then(forecastData);
            console.log(apiUrl.cityForecast);
        }else{
            axios.get(apiUrl.currLocWeather).then(weatherData);
            axios.get(apiUrl.currLocForecast).then(forecastData);
        }

        return (
            <div className= "Weather card container">
                {form}
                <h2>Loading...</h2>
            </div>);
    }
}