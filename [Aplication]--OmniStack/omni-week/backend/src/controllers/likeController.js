const _TWEET_MODEL = require('../models/tweet');

module.exports = {
    async store(req, res){
        const _TWEET = await _TWEET_MODEL.findById(req.params.id);
        
        // business rule: add +1 to likes fild.
        _TWEET.set({likes: _TWEET.likes + 1});
        
        await _TWEET.save();
        
        return res.json(_TWEET);
    }
}
