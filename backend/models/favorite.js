const mongoose=require("mongoose");
const favoriteSchema=new mongoose.Schema({
    contentId:String
});
module.exports=mongoose.model("Favorite",favoriteSchema);