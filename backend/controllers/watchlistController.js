const Watchlist=require('../models/Watchlist');
exports.addToWatchList=async(req,res)=>{
    try{
        await WatchList.create({
            userId:req.user.userId,
            tmdbId:req.user.tmdbId,
            title:req.user.title,
            posterPath:req.user.posterPath,
            mediaType:req.user.mediaType
        });
        res.json({message:"Added to watchList"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error adding to watchList"});
    }
};
    exports.getWatchList=async(req,res)=>{
        try{
            const items=await WatchList.find({userId:req.user.userId});
            res.json(items);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Error fetching watchList"});
        }
    };
    exports.removeFromWatchList=async(req,res)=>{
        try{
            await WatchList.findByIdAndDelete(req.params.id);
            res.json({message:"Removed from watchList"});
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Error removing from watchList"});
        }
    };
