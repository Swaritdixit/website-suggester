const Watchlist = require("../models/watchlist");

exports.addToWatchlist = async (req, res) => {
    try {

        await Watchlist.create({
            userId: req.user.userId,
            tmdbId: req.body.tmdbId,
            title: req.body.title,
            posterPath: req.body.posterPath,
            mediaType: req.body.mediaType
        });

        res.json({
            message: "Added to watchlist"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error adding to watchlist"
        });

    }
};

exports.getWatchlist = async (req, res) => {
    try {

        const items = await Watchlist.find({
            _id:req.params.id,
            userId: req.user.userId
        });

        res.json(items);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching watchlist"
        });

    }
};

exports.removeFromWatchlist = async (req, res) => {
    try {

       await Watchlist.deleteOne({
        _id:req.params.id,
    userId:req.user.userId
});

        res.json({
            message: "Removed from watchlist"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error removing from watchlist"
        });

    }
};