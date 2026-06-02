const Favourite=require("../models/favorite");

exports.addFavorite=async(req,res)=>{

    const{
        tmdbId,
        title,
        posterPath,
        mediaType
    }=req.body;

    const favourite=
    await Favourite.create({
        user:req.user.userId,
        tmdbId,
        title,
        posterPath,
        mediaType

    });

    res.json({
        message:"Added to favorite"
    });

};

exports.getFavorites=async(req,res)=>{

    const favourites=
await Favourite.find({

    user:req.user.userId

});

    res.json(favourites);

};

exports.removeFavorite=async(req,res)=>{

    await Favourite.deleteOne({

        _id:req.params.id,

        user:req.user.userId

    });

    res.json({
        message:"Removed from favorite"
    });

};