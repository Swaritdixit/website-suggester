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
mongoose.connect("mongodb+srv://Swarit:LeafSSS@entertainemnt.nusj0rs.mongodb.net/?appName=ENTERTAINEMNT")
.then(()=>(console.log("Connected to MongoDB")));
module.exports=mongoose.model("Content:",contentSchema);