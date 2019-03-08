// here is all fields for tweet schema in our database.
// import mongoose for assist our transactions in MongoDB and allocate ir in a constant.
const mongoose = require('mongoose');

// every fields of the tweet entity, will inside this function Schema.
const tweetSchema = new mongoose.Schema({
    author: String,
    content: String,
    likes: {
        type: Number,
        // this is the default value. If we not declare it, the users will see '0 likes' in the application.
        default: 0,
    },
    // timestamp field, for log purposes.
    createdAt: {
        type: Date,
        // at every insertion, this field will catch the exactly moment when it happens and interpret it as the default value.
        default: Date.now,
    },
});

// in case of other application imports this file 'Tweet.js', then it must receives the table model.
// notice: is used double quotes in the first parameter.
module.exports = mongoose.model("tweet", tweetSchema);
