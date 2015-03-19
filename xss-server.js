var express = require('express');
var app = express();
var compression = require('compression');

var fs = require('fs');
var bodyParser = require('body-parser');
var xss = require('xss');



// Start server and enabling comression and cache
var cacheTime = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/', { maxAge : cacheTime }));

app.use(bodyParser.urlencoded());

app.listen(5000, function(){
	console.log('Listening on 5000');
});


app.post('/post', function(req, res){
//	console.log('hey what is happening');
	var my_post = req.body;
//	console.log(my_post.data);
	var orig = my_post.data;
	var new_orig = xss(my_post.data);
console.log(orig);
console.log(new_orig);
	if(orig!=new_orig)
		res.json('xss');
	else
		res.json('not xss');
});


