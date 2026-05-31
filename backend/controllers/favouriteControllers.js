const Favourite = require('../models/favouriteModel');
const Content = require('../models/content');
exports.addToFavorite = async (req, res) => {
    await Favorite.create({
        contentId:req.params.id
    });
    res.json({message:"Added to favorite"});
    };
exports.getFavorites = async (req, res) => {
    const favorites = await Favorite.find();
    const ids=favorites.map(item=>item.contentId);
    const content=await Content.find({
        id:{
            $in:ids
        }
    });
    res.json(content);
  
}
exports.removeFromFavorite = async (req, res) => {
    await Favorite.deleteOne({contentId:req.params.id});
    res.json({message:"Removed from favorite"});
};