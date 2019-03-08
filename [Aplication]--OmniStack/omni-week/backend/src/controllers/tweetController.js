// every action correspondent to the Tweet feature (insert, update, delete), is described here.

const tweet = require("../models/tweet");

module.exports = {
    // we use async here. But you know the why? Is that the only way to do it?
    /* UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch()
     * DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
     */
    async index(req, res){
    // the variable tweets stores all tweets that we have in our database.
    // the method find is receiving 0 parameters, but you can perform many as you like.
    // using the method sort and the minus signal in the parameter, we are prioritizing the most recent tweets.
      const tweets = await tweet.find({}).sort("-createdAt");
      
    // and now we return a JSON file to our application access the data.
      return res.json(tweets);
    },
    
    async store(req, res){
    // when a new tweet is created.
    // collects the object attributes.
        const tweet = await tweet.create(req.body);
        
    // return the created item to the application, so the user can visualize.
        return res.json(tweet);
    }
}
