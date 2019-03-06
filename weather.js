const https = require('https');
const http  = require('http');

/**
 * Prints info from Treehouse user profile to stdout
 * @param {string} userName
 * @param {number} badgeCount
 * @param {number} points (JavaScript)
 */
const printMessage = (userName, badgeCount, points) => {
  const userInfo = `Treehouse user ${userName} has ${badgeCount} badges and ${points} points in JavaScript`;
  console.log(userInfo);
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
const printTreehouseProfile = userName => {
  try {
    const request = https.get(`https://teamtreehouse.com/${userName}.json`, (res) => {
      switch (res.statusCode) {
        case 200:
          let buffer = '';
          res.on('data', (d) => {
            buffer += d.toString();
          });

          res.on('end', () => {
            const profile = JSON.parse(buffer);
            printMessage(userName, profile.badges.length, profile.points.JavaScript)
          });
          break;
        case 404:
          console.error(`Treehouse user ${userName} not found`);
          break;
        default:
          console.error(`There was an error retrieving profile information for Treehouse user ${userName}: Status code: ${http.STATUS_CODES[res.statusCode]}`);
      }

    });
    request.on('error', (e) => {
      console.error('Problem with request: %s', e.message);
    });

  } catch (error) {
      console.error(error.message);
  }

}

module.exports.printTreehouseProfile = printTreehouseProfile;