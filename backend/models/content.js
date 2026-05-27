const mongoose=require("mongoose");


const contentSchema=new mongoose.Schema({
    title:String,
    genre:[String],
    mood:[String],
    type:[String],
    rating:Number,
    image:String,
    platforms:[String],
    description:String
});


module.exports=mongoose.model("Content",contentSchema);