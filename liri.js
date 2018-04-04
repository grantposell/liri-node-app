require("dotenv").config();

//Npm packages and external files
var keys = require("./keys.js");
var fs = require('fs');
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

//Inputing all of the information from the keys.js doc
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var argument = process.argv;
var value = argument[2];
//This formats the commands to allo multiple words into a single input
var inputValue = "";
for (var i = 3; i < argument.length; i++) {
    inputValue += argument[i] + " ";
}

switch (value) {
    case 'my-tweets':
        var params = { screen_name: 'naughtxchargers', count: 20 };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log('There has been an error loading tweets')
            }
        });
        break;
    case 'spotify-this-song':
        if (songName === "") {
            songName = "The Sign";
        }
        // spotify.search({ type: 'track', query: songName, limit: 5 }, function (err, data) {
        //     if (err) {
        //         return console.log('Error occurred: ' + err);
        //     }
            var title = process.argv[3];

            break;
    case 'movie-this':

        break;
    case "do-what-it-says":
        break;
    default:
        console.log("Not a valid operation. Choose: \n my-tweets\n spotify-this-song\n movie-this\n do-what-it-says");
        break;
}