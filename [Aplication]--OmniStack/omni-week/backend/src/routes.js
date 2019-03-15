const express = require('express');  //
const routes = express.Router(); //

//import controllers
const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');

// get is HTTP method for which the middleware function applies.
// it receives the route for which the middleware function applies.
// where req is the HTTP request argument to the middleware function.
routes.get("/", function(req, res) {
	return res.send('Hello from middleware response!');
});


//The endpoints has been tested using insomnia REST Client.
// HTTP Get = most used when the main purpose is to retrive an information.
routes.get('/tweets', TweetController.index);
// HTTP Post = most used when the intention is to create new information.
routes.post('/tweets', TweetController.store);
// informs express that the sentence after '/:' indicates a parameter. Tweet id in our case.
routes.post('/likes/:id', LikeController.store)

// HTTP Put = most used when the objective is to update an information.

// HTTP Delete = most used whe you want to delete an information.
module.exports = routes;
