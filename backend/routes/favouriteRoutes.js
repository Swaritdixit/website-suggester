const express=require("express");
const router=express.Router();
const{
    addFavorite,
    getFavorites,
    removeFavorite
}
=require("../controllers/favouriteControllers");
router.post("/favorite/:id",addFavorite);
router.get("/favorites",getFavorites);
router.delete("/favorite/:id",removeFavorite);
module.exports=router;