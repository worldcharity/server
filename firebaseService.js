var firebase = require('firebase-admin');
var request = require('request');

var API_KEY = "AAAAdlV1GHA:APA91bEsdnKCjbHwVQC0bfzGNjhpC1nEzmw-c0krODekuQg20dVG9dHB69EujjeDlSEp8mYG6keC7RVRSE4csG2HROvvLJKpG-leyBPIcUcuUzffGSle_xmzlNs0J9X8_ysa7z-OPApA"; // Your Firebase Cloud Messaging Server API key

// Fetch the service account key JSON file contents
var serviceAccount = require("./worldCharityServiceAccount.json");

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://androidwolrdchar-1545272752193.firebaseio.com"
});

// Send a message to the device corresponding to the provided
// registration token.
exports.sendMsg = function(message)
  {
  firebase.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}
