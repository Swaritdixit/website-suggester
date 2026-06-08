const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');

const{
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist
}=require('../controllers/watchlistController');

router.post('/watchlist',auth,addToWatchlist);

router.get('/watchlist',auth,getWatchlist);

router.delete(
'/watchlist/remove/:id',
auth,
removeFromWatchlist
);

module.exports=router;