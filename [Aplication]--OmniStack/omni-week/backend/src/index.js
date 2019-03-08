// create constants, so that the variable value can not be changed in execution time.

// import the express extension and alocate in the a variable declared as a constant.
const express = require("express");
const mongoose = require("mongoose");

// alocate the middleware function into another constant named app.
const app = express();

// right before the application starts, open a connection with our database.
// {} is used for objects. But what is that parameter?
mongoose.connect("*Mlab_Url_<dbuser>_<dbpassword>*", {useNewUrlParser: true});

// this is the explicitly way to notificate our app that every requisition will incomes in JSON format.
app.use(express.json());

// now the main application knows the available routes.
app.use(require("./routes"));

// alocate the application on port 3000, for local access.
app.listen(3000, function() {
	console.log('Server started on port 3000.');
});

// we will be using the MVC project pattern.
// Model = the entities of our DB schemma.
// Controler = the code correspondent to our business rules.
// View = React application. 
//
