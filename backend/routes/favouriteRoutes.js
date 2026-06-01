const express=require("express");
const auth=require("../middleware/auth");
const router=express.Router();
const{
    addFavorite,
    getFavorites,
    removeFavorite
}
=require("../controllers/favouriteControllers");
router.post("/favorites",auth,addFavorite);
router.get("/favorites",auth,getFavorites);
router.delete("/favorites/:id",auth,removeFavorite);
module.exports=router;