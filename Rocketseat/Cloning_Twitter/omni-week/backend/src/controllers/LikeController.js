const Tweet = require('../models/Tweet');

module.exports = {
    async store(req, res){
        const tweet = await Tweet.findById(req.params.id);
        
        // business rule: add +1 to likes fild.
        tweet.set({likes: tweet.likes + 1});
        
        await tweet.save();

        // when a like is given to a tweet, update the document in real-time.
    	req.io.emit('like', tweet);
        
        return res.json(tweet);
    }
}
