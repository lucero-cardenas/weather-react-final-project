import React from "react";

export default function CurrentTime(){
    let currentDate = new Date();

    let hours = currentDate.getHours();
    if (hours.toString().length < 2) {
        hours = `0${hours}`;
    }
    let minutes = currentDate.getMinutes();
    if (minutes.toString().length < 2) {
        minutes = `0${minutes}`;
    }
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[currentDate.getDay()];

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[currentDate.getMonth()];
    let date = currentDate.getDate();
    let year = currentDate.getFullYear();

    return(`${day}, ${date} ${month}, ${year}, ${hours}:${minutes}`);
}