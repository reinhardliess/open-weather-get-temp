// App that retrieves temperature data using the OpenWeather API
const weather = require('./weather.js');
const locations = process.argv.slice(2);

if (!locations.length || locations.map(element => element.toLowerCase()).includes("--help")) {
  weather.printHelp();
} else {
  locations.forEach(weather.printTempApi);
}
