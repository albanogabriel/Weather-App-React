import './WeatherApp.css'

import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import search_icon from '../Assets/search.png'

import wind_icon from '../Assets/wind.png'
import { useState } from 'react'

export const WeatherApp = () => {

    let api_key = "4c9aeff976665d929baf048517fb66b3"

    const [weatherImage, setWeatherImage] = useState(cloud_icon)

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")

        if (element[0].value === ""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response = await fetch(url)
        let data = await response.json()

        const humidity = document.getElementsByClassName('humidity-percent')
        const wind = document.getElementsByClassName('wind-rate')
        const temperature = document.getElementsByClassName('weather-temp')
        const location = document.getElementsByClassName('weather-location')

        humidity[0].innerHTML = data.main.humidity + "%"
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h"
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°c"
        location[0].innerHTML = data.name

        const  dataIcon = data.weather[0].icon

        if (dataIcon === "01d" || dataIcon === "01n"){
            setWeatherImage(clear_icon)
        } else if (dataIcon === "02d" || dataIcon === "02n") {
            setWeatherImage(cloud_icon)
        } else if (dataIcon === "03d" || dataIcon === "03n" || dataIcon === "04d" || dataIcon === "04n") {
            setWeatherImage(drizzle_icon)
        } else if (dataIcon === "09d" || dataIcon === "09n") {
            setWeatherImage(rain_icon)
        } else if (dataIcon === "10d" || dataIcon === "10n") {
            setWeatherImage(rain_icon)
        } else if (dataIcon === "13d" || dataIcon === "13n"){
            setWeatherImage(snow_icon)
        } else {
            setWeatherImage(clear_icon)
        }

        return element[0].value = ""
    }


    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={() => {search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherImage} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon}  alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>

    )
}