// create constants, so that the variable value can not be changed in execution time.
// import the express extension and alocate in the a variable declared as a constant.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
// alocate the middleware function into another constant named app.
const app = express();
// in order to parse our http server created using express.
const server = require('http').Server(app);
// in order to our server be able to operates communications using WS protocol for real-time events.
const io = require('socket.io')(server);

// right before the application starts, open a connection with our database.
// {} is used for objects. But what is that parameter?
mongoose.connect('mongodb://localhost:27017/goweek-backend', {useNewUrlParser: true});


// we will create a middleware, which will act as a broker intercepting the requests made to our backend and add extra information.
app.use((req, res, next) => {
	// now the scope of io is set to globally.
	req.io = io;

	return next();
});


app.use(cors());

// this is the explicitly way to notificate our app that every requisition will incomes in JSON format.
app.use(express.json());

// now the main application knows the available routes.
app.use(require("./routes"));

// alocate the application on port 3000, for local access, ws protocols, and so on...
server.listen(3000, function() {
	console.log('Server started on port 3000.');
});

// we will be using the MVC project pattern.
// Model = the entities of our DB schemma.
// Controler = the code correspondent to our business rules.
// View = React application. 
//
