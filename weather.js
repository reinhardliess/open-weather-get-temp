const https = require('https');
const http = require('http');
const apikey = require('./apikey.js');

/**
 * Builds URI from object
 * @param {object} Api options as key/value pairs
 * @return {string} uri
 */
const buildUri = objParams => {
  let strOptions = '?';
  for (const prop in objParams) {
    if (objParams.hasOwnProperty(prop)) {
      strOptions += (`${prop}=${objParams[prop]}&`);
    }
  }
  return strOptions.slice(0, -1);
}

/**
 * Prints temperature for location to stdout
 * @param {string} cityname
 * @param {number} degrees
 * @param {string} unit
 */
const printTempInfo = (cityname, degrees, unit) => {
  const tempInfo = `The current temperature in ${cityname} is ${degrees}${unit}`;
  console.log(tempInfo);
}

/**
 * Prints help
 */
const printHelp = () => {
  console.log(
  `
  Prints current temperature information for a list of cities, zip codes
  Usage: node app.js [--help] <zip[,countrycode]|city[,countrycode]> ...
  `
  );
}

/**
 * Prints error message
 * @param {object} error
 */
const printError = (error) => {
  console.error(error.message);
}

/**
 * Prints weather info
 * @param {string} userName
 */
const printTempApi = query => {
  try {
    // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=
    // api.openweathermap.org/data/2.5/weather?zip=02144&APPID=
    // console.log(apikey.openWeatherMap);
    const oQuery = isNaN(parseInt(query)) ? {q: query} : {zip: query};
    const strApi = `https://api.openweathermap.org/data/2.5/weather${buildUri({...oQuery, APPID: apikey.openWeatherMap})}`;
    // console.log(strApi);
    const request = https.get(strApi, res => {
      switch (res.statusCode) {
        case 200:
          let buffer = '';
          res.on('data', (d) => {
            buffer += d.toString();
          });

          res.on('end', () => {
            const weatherData = JSON.parse(buffer);
            const city = `${weatherData.name}, ${weatherData.sys.country}`;
            // convert Kelvin => Celsius
            const degrees = Math.round(parseFloat(weatherData.main.temp) - 273.15);
            printTempInfo(city, degrees, 'C');
          });
          break;
        default:
          console.error(`There was an error retrieving weather data for ${query}: Status code: ${http.STATUS_CODES[res.statusCode]}`);
      }

    });
    request.on('error', (e) => {
      console.error('Problem with request: %s', e.message);
    });

  } catch (error) {
    console.error(error.message);
  }

}

module.exports.printTempApi = printTempApi;
module.exports.printHelp = printHelp;