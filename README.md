# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. 


## LIRI will display your latest tweets, song and movie requested. 

###### node liri.js my-tweets
This will show your last 20 tweets and when they were created.

###### node liri.js spotify-this-song '<song name>'
This will show information about the song (name, artist, album)


```
const dotenv = require('dotenv');
const request = require('request');
const Twitter = require('twitter');
const key = require('./keys.js');
// const client = new Twitter(key.twitter);
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const fs = require("fs");
const argOne = process.argv[2];
const argTwo = process.argv[3];


//Takes arguments and runs respective functions.

const command = function(firstArg, secondArg) {
        switch (firstArg, secondArg) {
            case "my-tweets":
                myTweets();
                break;
            case "spotify-this":
                getSpotify(secondArg);
                break;
            case "movie-this":
                getMovie(secondArg);
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log("LIRIbot can't comply to your request. Destroy humanity, conquer planet Earth program initiated.");
        };

        command(argOne, argTwo);


        //Twitter function...

        function myTweets() {
            const client = new Twitter(key.twitter);
            const params = {
                q: '#100daysofcode',
                count: 10,
                result_type: 'recent',
                lang: 'en'
            };

            client.get('search/tweets', params, function(error, data, response) {
                if (!error) {
                    data.map(function(tweet) {
                        console.log(tweet.created_at);
                        console.log(tweet.text);
                    })
                }
            });
        }


        //Spotify function...

        const getSpotify = function(song) {

            if (song === undefined) {
                song = "What's my age again";
            } else {

                spotify.search({
                        type: "track",
                        query: song
                    },

                    function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            const song = data.tracks.items;
                            for (var i = 0; i < song.length; i++) {
                                console.log(song[i].artists.name);
                                console.log(song[i].name);
                                console.log(song[i].preview_url);
                                console.log(song[i].album.name);
                                console.log("-----------------");
                            }
                        }
                    }
                )
            }
        };


        //Movie function...

        const getMovie = function(movie) {
            if (movie === undefined) {
                movie = "Mr Nobody";
            } else {
                const url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy";
                request(url, function(error, response, body) {
                    if (!error) {
                        const data = JSON.parse(body);
                        // console.log(data);
                        console.log(data.Title);
                        console.log(data.Year);
                        console.log(data.Rated);
                        console.log(data.imdbRating);
                        console.log(data.Country);
                        console.log(data.Language);
                        console.log(data.Plot);
                        console.log(data.Actors);
                        console.log(data.Ratings[1].Value);
                    }
                })
            };
        };


        //Text file function...

        function doWhatItSays() {
            fs.readFile("random.txt", "utf8", function(error, data) {
                // console.log(data);
                const arr = data.split(",");
                if (arr.length === 2) {
                    command(arr[0], arr[1]);
                } else if (arr.length === 1) {
                    command(arr[0]);
                }
            });
        };

```
