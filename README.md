# get-temp.js - a small node.js weather app

This is a small node.js console app to retrieve the current temperatures(in Celsius) of a list of cities either by city name or zip code using the OpenWeatherMap API.

## Installation

* Copy `weather.js`, `get-temp.js` and `apikey_template.js` to any directory.
* Add your API key from [OpenWeatherMap](https://openweathermap.org/) to `apikey_template.js` and rename it to `apikey.js`.

## How to run

`Usage: node get-temp.js [--help] <zip[,country code]|city[,country code]> ...`

Multi-word cities, e.g. New York, should be wrapped in quotes.\
If you leave out the zip [country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes), the API will search for zips in the United States.

### Example

```
$ node get-temp.js melbourne,au london,uk dakar 02144
The current temperature in Melbourne, AU is 21C
The current temperature in London, GB is 6C
The current temperature in Dakar, SN is 17C
The current temperature in Boston, US is -12C
```