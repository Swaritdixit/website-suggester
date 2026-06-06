const mongoose=require("mongoose");

const favoriteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tmdbId:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    posterPath:{
        type:String
    },
    mediaType:{
        type:String
    }
});


module.exports= mongoose.models.Favorite||mongoose.model("Favorite",favoriteSchema);