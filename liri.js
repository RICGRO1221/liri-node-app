
var dotenv = require('dotenv');
var request = require('request');
var Twitter = require('twitter');
var key = require('./keys.js');
var client = new Twitter(key.twitter);
// var reqSpotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

var argument = process.argv[2];

if (argument === 'twitter') {
	myTweets();
}


function myTweets() {
	var params = { q: '#100daysofcode', count: 10, result_type: 'recent', lang: 'en' };
	client.get('search/tweets', params, function(error, data, response) {
		if (error) {
			console.log('There has been an error!!!');
			console.log(error);
		} else {
			console.log(data);
			console.log(response);
		}
	});
}