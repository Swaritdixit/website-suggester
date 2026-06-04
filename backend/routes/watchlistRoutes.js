const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const{
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist 
}=require('../controllers/watchlistController');
router.post('/add',auth,addToWatchlist);
router.get('/',auth,getWatchlist);
router.delete('/remove/:id',auth,removeFromWatchlist);
module.exports=router;  