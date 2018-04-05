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
//Adding a switch case to allow multiple calls to be made to pull different information
switch (value) {
    //calling the tweets from naughtxchargers twitter page
    case 'my-tweets':
        var params = { screen_name: 'naughtxchargers', count: 3 };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log('There has been an error loading tweets')
                for (var i = 0; i < tweets.length; i++) {
                    console.log("@" + tweets[i].user.screen_name + '\n' + tweets[i].text + '\n' + "Retweets: " + tweets[i].retweet_count + ' ' + "Favorites: " + tweets[i].favorite_count + '\n' + tweets[i].created_at + '\n=====================================');
                }
            }
        });
        break;
    //Calling songs using the spotify npm module    
    case 'spotify-this-song':
        var songTitle = process.argv[3];
        var trackAssets;
        if (songTitle) {
            spotify.search({ type: 'track', query: songTitle, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                trackAssets = data.tracks.items[0];
                console.log(`Song:${trackAssets.name}'\n' Artist: ${trackAssets.artists[0].name}'\n' Spotify Link: ${trackAssets.album.external_urls.spotify}'\n' + Album Name: ${trackAssets.album.name}`);
            });
        } else {
            spotify.search({ type: 'track', query: "The Sign", limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                trackAssets = data.tracks.items[0];
                console.log(`Song:${trackAssets.name}'\n' Artist: ${trackAssets.artists[0].name}'\n' Spotify Link: ${trackAssets.album.external_urls.spotify}'\n' + Album Name: ${trackAssets.album.name}`);
            });
        };
        break;
    //Allowing calls for multiple word titles  
    case 'movie-this':
        var extendedArgs = process.argv;
        var movieName = "";
       
        for (var i = 3; i < extendedArgs.length; i++) {

            if (i > 3 && i < extendedArgs.length) {
                movieName = movieName + "+" + extendedArgs[i];
            }
            else {
                movieName += extendedArgs[i];
            }
        }
        //Using the API call, the user can get information on movies on IMDB
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=87e2af0b";
        if (extendedArgs[3]) {
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("Title of the movie: " + JSON.parse(body).Title + '\n' + "Year the movie came out: " + JSON.parse(body).Year + '\n' + "IMDB Rating of the movie: " + JSON.parse(body).imdbRating + '\n' + "Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value + '\n' + "Country where the movie was produced: " + JSON.parse(body).Production + '\n' + "Language of the movie: " + JSON.parse(body).Language + '\n' + "Plot of the movie: " + JSON.parse(body).Plot + '\n' + "Actors/Actresses in the movie: " + JSON.parse(body).Actors);
                }
            });
        }
        else {
            movieName = "Mr. Nobody";
            queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=87e2af0b";
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("Title of the movie: " + JSON.parse(body).Title + '\n' + "Year the movie came out: " + JSON.parse(body).Year + '\n' + "IMDB Rating of the movie: " + JSON.parse(body).imdbRating + '\n' + "Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value + '\n' + "Country where the movie was produced: " + JSON.parse(body).Production + '\n' + "Language of the movie: " + JSON.parse(body).Language + '\n' + "Plot of the movie: " + JSON.parse(body).Plot + '\n' + "Actors/Actresses in the movie: " + JSON.parse(body).Actors);

                }
            });
        }
        break;
    case "do-what-it-says":
        fs.readFile("./random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }
            var output = data.split(",");
            spotify.search({ type: 'track', query: output[1], limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                trackItems = data.tracks.items[0];
                console.log("Song: " + trackItems.name + '\n' + "Artist: " + trackItems.artists[0].name + '\n' + "Spotify Link: " + trackItems.album.external_urls.spotify + '\n' + "Album Name: " + trackItems.album.name);
            });
        });
        break;
    default:
        console.log("Not a valid operation. Choose:my-tweets, spotify-this-song,  movie-this, do-what-it-says");
        break;
}