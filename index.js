require('dotenv').config({
	path: __dirname + '/.env'
});
const express = require('express');
const app = express();
var https = require('https');
const username = process.env['username'];
const token = process.env['token'];
const host = process.env['host'];


app.listen(3000, function (req, res) {
	console.log('Node Server Running on Port 3000');
});


app.get('/', function (req, res) {

	var options = {
		host: host,
		port: 443,
		path: '/wp-json/wp/v2/users?role=author',
		// authentication headers
		headers: {
			'Authorization': 'Basic ' + new Buffer.from(username + ':' + token).toString('base64')
		}
	};
	//this is the call
  request = https.get(options, function(res){
     var body = "";
     res.on('data', function(data) {
        body += data;
     });
     res.on('end', function() {
      //here we have the full response, html or json object
        // res.write(body);
        console.log(body);
     })
     res.on('error', function(e) {
        console.log("Got error: " + e.message);
     });
    });
});
