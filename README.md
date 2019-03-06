# get-temp.js - a small node.js weather app

This is a small node.js console app to retrieve the current temperatures(in Celsius) of a list of cities either by city name or zip code using the OpenWeatherMap API.

## Installation

* Copy `weather.js`, `get-temp.js` and `apikey_template.js` to any directory.
* Add your API key from [OpenWeatherMap](https://openweathermap.org/) to `apikey_template.js` and rename it to `apikey.js`.

## How to run

`Usage: node get-temp.js [--help] <zip[,country code]|city[,country code]> ...`