const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    tmdbId:{
        type:Number,
        required:true
    },

    title:String,
    posterPath:String,
    mediaType:String
});

module.exports =
mongoose.models.Watchlist ||
mongoose.model("Watchlist",watchlistSchema);