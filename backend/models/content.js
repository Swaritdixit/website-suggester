const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
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
mongoose.connect(process.env.Mongo_DB)
.then(()=>(console.log("Connected to MongoDB")));
module.exports=mongoose.model("Content:",contentSchema);